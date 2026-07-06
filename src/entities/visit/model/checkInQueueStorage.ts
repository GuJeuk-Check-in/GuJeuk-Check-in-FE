import {
  CHECK_IN_QUEUE_KINDS,
  CHECK_IN_QUEUE_STATUSES,
  type CheckInQueuePayload,
  type CheckInQueueRecord,
} from './checkInQueueTypes';

const DB_NAME = 'gujeuk-check-in';
const DB_VERSION = 2;
const STORE_NAME = 'checkInQueue';
const INITIAL_RETRY_DELAY_MS = 30_000;
const STALE_SYNCING_MS = 2 * 60_000;

const isRecordObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isExistingUserPayload = (value: unknown) => {
  if (!isRecordObject(value)) return false;

  return (
    typeof value.userId === 'number' &&
    typeof value.maleCount === 'number' &&
    typeof value.femaleCount === 'number' &&
    typeof value.purpose === 'string' &&
    typeof value.visitTime === 'string'
  );
};

const isNewUserPayload = (value: unknown) => {
  if (!isRecordObject(value)) return false;

  return (
    typeof value.name === 'string' &&
    (value.gender === 'MAN' || value.gender === 'WOMAN') &&
    typeof value.phone === 'string' &&
    typeof value.maleCount === 'number' &&
    typeof value.femaleCount === 'number' &&
    typeof value.birthYMD === 'string' &&
    typeof value.residence === 'string' &&
    typeof value.privacyAgreed === 'boolean' &&
    typeof value.purpose === 'string' &&
    typeof value.visitTime === 'string'
  );
};

const isCheckInQueueRecord = (value: unknown): value is CheckInQueueRecord => {
  if (!isRecordObject(value)) return false;

  const sharedShapeIsValid =
    typeof value.id === 'string' &&
    (value.status === CHECK_IN_QUEUE_STATUSES.PENDING ||
      value.status === CHECK_IN_QUEUE_STATUSES.SYNCING ||
      value.status === CHECK_IN_QUEUE_STATUSES.FAILED) &&
    typeof value.attemptCount === 'number' &&
    (typeof value.lastError === 'string' || value.lastError === null) &&
    (typeof value.nextRetryAt === 'number' || value.nextRetryAt === null) &&
    typeof value.createdAt === 'number' &&
    typeof value.updatedAt === 'number';

  if (!sharedShapeIsValid) return false;

  if (value.kind === CHECK_IN_QUEUE_KINDS.EXISTING_USER_CHECK_IN) {
    return isExistingUserPayload(value.payload);
  }

  if (value.kind === CHECK_IN_QUEUE_KINDS.NEW_USER_SIGN_UP) {
    return isNewUserPayload(value.payload);
  }

  return false;
};

const createQueueId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const openCheckInQueueDb = (): Promise<IDBDatabase> =>
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
    const store = transaction.objectStore(STORE_NAME);
    return await action(store);
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
  const record: CheckInQueueRecord = {
    ...queuePayload,
    id: createQueueId(),
    status: CHECK_IN_QUEUE_STATUSES.PENDING,
    attemptCount: 0,
    lastError: null,
    nextRetryAt: now + INITIAL_RETRY_DELAY_MS,
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
): Promise<readonly CheckInQueueRecord[]> =>
  withStore('readonly', async (store) => {
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
    updatedAt: now,
  };

  await withStore('readwrite', async (store) => {
    await waitForRequest(store.put(nextRecord));
  });
};

export const deleteCheckInQueueRecord = async (id: string): Promise<void> => {
  await withStore('readwrite', async (store) => {
    await waitForRequest(store.delete(id));
  });
};
