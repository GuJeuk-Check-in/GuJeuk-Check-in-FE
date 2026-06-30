import { CheckInQueuePayload, CreateUserVisitRequest } from './types';

export type CheckInQueueStatus = 'pending' | 'syncing' | 'failed';

export interface CheckInQueueItem {
  id: string;
  payload: CheckInQueuePayload;
  status: CheckInQueueStatus;
  attemptCount: number;
  lastError?: string;
  createdAt: string;
  updatedAt: string;
  lastAttemptAt?: string;
}

const DB_NAME = 'gujeuk-check-in';
const DB_VERSION = 2;
const STORE_NAME = 'checkInQueue';

const createQueueId = () => {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const getNow = () => new Date().toISOString();

const openCheckInQueueDb = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('status', 'status', { unique: false });
        store.createIndex('updatedAt', 'updatedAt', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

const runQueueTransaction = async <T>(
  mode: IDBTransactionMode,
  work: (store: IDBObjectStore) => IDBRequest<T>
): Promise<T> => {
  const db = await openCheckInQueueDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, mode);
    const store = transaction.objectStore(STORE_NAME);
    const request = work(store);
    let result: T;

    request.onsuccess = () => {
      result = request.result;
    };
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => {
      db.close();
      resolve(result);
    };
    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
    transaction.onabort = () => {
      db.close();
      reject(transaction.error);
    };
  });
};

export const enqueueCheckIn = async (
  payload: CheckInQueuePayload
): Promise<CheckInQueueItem> => {
  const now = getNow();
  const item: CheckInQueueItem = {
    id: createQueueId(),
    payload,
    status: 'pending',
    attemptCount: 0,
    createdAt: now,
    updatedAt: now,
  };

  await runQueueTransaction('readwrite', (store) => store.add(item));
  return item;
};

export const enqueueLegacyPublicVisit = async (
  payload: CreateUserVisitRequest
): Promise<CheckInQueueItem> =>
  enqueueCheckIn({ kind: 'legacy-public-visit', payload });

export const getRetryableCheckIns = async (): Promise<CheckInQueueItem[]> => {
  const items = await runQueueTransaction<CheckInQueueItem[]>('readonly', (store) =>
    store.getAll()
  );

  return items
    .filter((item) => item.status === 'pending' || item.status === 'failed')
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
};

export const markCheckInSyncing = async (
  item: CheckInQueueItem
): Promise<CheckInQueueItem> => {
  const updatedItem: CheckInQueueItem = {
    ...item,
    status: 'syncing',
    lastAttemptAt: getNow(),
    updatedAt: getNow(),
  };

  await runQueueTransaction('readwrite', (store) => store.put(updatedItem));
  return updatedItem;
};

export const markCheckInFailed = async (
  item: CheckInQueueItem,
  errorMessage: string
): Promise<CheckInQueueItem> => {
  const now = getNow();
  const updatedItem: CheckInQueueItem = {
    ...item,
    status: 'failed',
    attemptCount: item.attemptCount + 1,
    lastError: errorMessage,
    updatedAt: now,
    lastAttemptAt: item.lastAttemptAt || now,
  };

  await runQueueTransaction('readwrite', (store) => store.put(updatedItem));
  return updatedItem;
};

export const deleteQueuedCheckIn = async (id: string): Promise<void> => {
  await runQueueTransaction('readwrite', (store) => store.delete(id));
};

export const recoverSyncingCheckIns = async (): Promise<void> => {
  const items = await runQueueTransaction<CheckInQueueItem[]>('readonly', (store) =>
    store.getAll()
  );
  const syncingItems = items.filter((item) => item.status === 'syncing');

  await Promise.all(
    syncingItems.map((item) =>
      runQueueTransaction('readwrite', (store) =>
        store.put({
          ...item,
          status: 'failed',
          lastError: '동기화가 완료되지 않아 재시도 대기 상태로 복구되었습니다.',
          updatedAt: getNow(),
        })
      )
    )
  );
};
