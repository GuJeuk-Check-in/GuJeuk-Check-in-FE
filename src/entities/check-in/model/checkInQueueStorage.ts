import {
  CHECK_IN_QUEUE_KINDS,
  CHECK_IN_QUEUE_STATUSES,
  type CheckInQueuePayload,
  type CheckInQueueRecord,
} from './checkInQueueTypes';
import { isCheckInQueueRecord } from './checkInQueueRecordParser';
import { createClientRecordId } from './clientRecordId';

const DB_NAME = 'gujeuk-check-in';
const DB_VERSION = 3;
const STORE_NAME = 'checkInQueue';
export const CHECK_IN_QUEUE_DRAIN_LOCK_STORE_NAME = 'checkInQueueDrainLock';
const INITIAL_RETRY_DELAY_MS = 30_000;
const STALE_SYNCING_MS = 2 * 60_000;
export const CHECK_IN_QUEUE_PERMANENT_FAILURE_RETENTION_MS =
  7 * 24 * 60 * 60 * 1000;

class CheckInQueueTransactionError extends Error {
  readonly name = 'CheckInQueueTransactionError';

  constructor(readonly outcome: 'failed' | 'aborted') {
    super(
      outcome === 'failed'
        ? 'IndexedDB 트랜잭션을 완료하지 못했습니다.'
        : 'IndexedDB 트랜잭션이 중단되었습니다.'
    );
  }
}

const waitForTransaction = (transaction: IDBTransaction): Promise<void> =>
  new Promise((resolve, reject) => {
    transaction.oncomplete = () => {
      resolve();
    };
    transaction.onerror = () => {
      reject(transaction.error ?? new CheckInQueueTransactionError('failed'));
    };
    transaction.onabort = () => {
      reject(transaction.error ?? new CheckInQueueTransactionError('aborted'));
    };
  });

export const openCheckInQueueDb = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      const store = db.objectStoreNames.contains(STORE_NAME)
        ? request.transaction?.objectStore(STORE_NAME)
        : db.createObjectStore(STORE_NAME, { keyPath: 'id' });

      if (!store) return;

      if (!store.indexNames.contains('status')) {
        store.createIndex('status', 'status', { unique: false });
      }

      if (!store.indexNames.contains('nextRetryAt')) {
        store.createIndex('nextRetryAt', 'nextRetryAt', { unique: false });
      }

      if (!db.objectStoreNames.contains(CHECK_IN_QUEUE_DRAIN_LOCK_STORE_NAME)) {
        db.createObjectStore(CHECK_IN_QUEUE_DRAIN_LOCK_STORE_NAME, {
          keyPath: 'id',
        });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error ?? new Error('IndexedDB를 열지 못했습니다.'));
    };
  });

const withStore = async <T>(
  mode: IDBTransactionMode,
  action: (store: IDBObjectStore) => Promise<T>
): Promise<T> => {
  const db = await openCheckInQueueDb();

  try {
    const transaction = db.transaction(STORE_NAME, mode);
    const transactionCompleted = waitForTransaction(transaction);
    const store = transaction.objectStore(STORE_NAME);
    const [result] = await Promise.all([action(store), transactionCompleted]);
    return result;
  } finally {
    db.close();
  }
};

const waitForRequest = <T>(request: IDBRequest<T>): Promise<T> =>
  new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error ?? new Error('IndexedDB 요청을 처리하지 못했습니다.'));
    };
  });

export const enqueueCheckIn = async (
  queuePayload: CheckInQueuePayload
): Promise<CheckInQueueRecord> => {
  const now = Date.now();
  const isHighAvailabilityRecord =
    queuePayload.kind === CHECK_IN_QUEUE_KINDS.HIGH_AVAILABILITY_CHECK_IN;
  const record: CheckInQueueRecord = {
    ...queuePayload,
    id: isHighAvailabilityRecord
      ? queuePayload.payload.clientRecordId
      : createClientRecordId(),
    status: CHECK_IN_QUEUE_STATUSES.PENDING,
    attemptCount: 0,
    lastError: null,
    nextRetryAt: isHighAvailabilityRecord
      ? now
      : now + INITIAL_RETRY_DELAY_MS,
    createdAt: now,
    updatedAt: now,
  };

  await withStore('readwrite', async (store) => {
    await waitForRequest(store.add(record));
  });
  return record;
};

export const getDueCheckInQueueRecords = async (
  now: number,
  limit: number
): Promise<readonly CheckInQueueRecord[]> => {
  await cleanupExpiredPermanentFailureRecords(now);

  return withStore('readonly', async (store) => {
    const rawItems: unknown = await waitForRequest(store.getAll());
    if (!Array.isArray(rawItems)) return [];

    return rawItems
      .filter(isCheckInQueueRecord)
      .filter((record) => {
        if (record.status === CHECK_IN_QUEUE_STATUSES.SYNCING) {
          return record.updatedAt + STALE_SYNCING_MS <= now;
        }

        if (
          record.status !== CHECK_IN_QUEUE_STATUSES.PENDING &&
          record.status !== CHECK_IN_QUEUE_STATUSES.FAILED
        ) {
          return false;
        }

        if (record.nextRetryAt === null) return false;

        return record.nextRetryAt <= now;
      })
      .sort((left, right) => left.createdAt - right.createdAt)
      .slice(0, limit);
  });
};

const cleanupExpiredPermanentFailureRecords = async (
  now: number
): Promise<void> => {
  await withStore('readwrite', async (store) => {
    const rawItems: unknown = await waitForRequest(store.getAll());
    if (!Array.isArray(rawItems)) return;

    await Promise.all(
      rawItems
        .filter(isCheckInQueueRecord)
        .filter(
          (record) =>
            record.status === CHECK_IN_QUEUE_STATUSES.FAILED &&
            record.nextRetryAt === null &&
            (record.retentionExpiresAt ??
              record.updatedAt + CHECK_IN_QUEUE_PERMANENT_FAILURE_RETENTION_MS) <=
              now
        )
        .map((record) => waitForRequest(store.delete(record.id)))
    );
  });
};

export const markCheckInQueueRecordSyncing = async (
  record: CheckInQueueRecord,
  now: number
): Promise<void> => {
  const nextRecord: CheckInQueueRecord = {
    ...record,
    status: CHECK_IN_QUEUE_STATUSES.SYNCING,
    updatedAt: now,
  };

  await withStore('readwrite', async (store) => {
    await waitForRequest(store.put(nextRecord));
  });
};

export const markCheckInQueueRecordFailed = async (
  record: CheckInQueueRecord,
  errorMessage: string,
  nextRetryAt: number | null,
  now: number
): Promise<void> => {
  const nextRecord: CheckInQueueRecord = {
    ...record,
    status: CHECK_IN_QUEUE_STATUSES.FAILED,
    attemptCount: record.attemptCount + 1,
    lastError: errorMessage,
    nextRetryAt,
    retentionExpiresAt:
      nextRetryAt === null
        ? now + CHECK_IN_QUEUE_PERMANENT_FAILURE_RETENTION_MS
        : null,
    updatedAt: now,
  };

  await withStore('readwrite', async (store) => {
    await waitForRequest(store.put(nextRecord));
  });
};

export const deleteCheckInQueueRecords = async (
  ids: readonly string[]
): Promise<void> => {
  await withStore('readwrite', async (store) => {
    await Promise.all(ids.map((id) => waitForRequest(store.delete(id))));
  });
};
