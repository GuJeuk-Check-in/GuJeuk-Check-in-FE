import {
  CHECK_IN_QUEUE_DRAIN_LOCK_STORE_NAME,
  openCheckInQueueDb,
} from './checkInQueueStorage';

const WEB_LOCK_NAME = 'gujeuk-check-in:queue-drain';
const FALLBACK_LOCK_ID = 'check-in-queue-drain';
const FALLBACK_LOCK_TTL_MS = 2 * 60_000;

type DrainLockRecord = {
  readonly id: typeof FALLBACK_LOCK_ID;
  readonly ownerId: string;
  readonly expiresAt: number;
};

const isRecordObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isDrainLockRecord = (value: unknown): value is DrainLockRecord =>
  isRecordObject(value) &&
  value.id === FALLBACK_LOCK_ID &&
  typeof value.ownerId === 'string' &&
  typeof value.expiresAt === 'number';

const createOwnerId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const acquireFallbackLock = (ownerId: string): Promise<boolean> =>
  openCheckInQueueDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const now = Date.now();
        const transaction = db.transaction(
          CHECK_IN_QUEUE_DRAIN_LOCK_STORE_NAME,
          'readwrite'
        );
        const store = transaction.objectStore(
          CHECK_IN_QUEUE_DRAIN_LOCK_STORE_NAME
        );
        let acquired = false;

        transaction.oncomplete = () => {
          db.close();
          resolve(acquired);
        };
        transaction.onerror = () => {
          db.close();
          reject(
            transaction.error ?? new Error('큐 drain lock을 잡지 못했습니다.')
          );
        };
        transaction.onabort = () => {
          db.close();
          reject(transaction.error ?? new Error('큐 drain lock이 중단되었습니다.'));
        };

        const request = store.get(FALLBACK_LOCK_ID);
        request.onerror = () => {
          transaction.abort();
        };
        request.onsuccess = () => {
          const currentLock: unknown = request.result;

          if (
            isDrainLockRecord(currentLock) &&
            currentLock.expiresAt > now
          ) {
            return;
          }

          const putRequest = store.put({
            id: FALLBACK_LOCK_ID,
            ownerId,
            expiresAt: now + FALLBACK_LOCK_TTL_MS,
          } satisfies DrainLockRecord);

          putRequest.onerror = () => {
            transaction.abort();
          };
          putRequest.onsuccess = () => {
            acquired = true;
          };
        };
      })
  );

const releaseFallbackLock = (ownerId: string): Promise<void> =>
  openCheckInQueueDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const transaction = db.transaction(
          CHECK_IN_QUEUE_DRAIN_LOCK_STORE_NAME,
          'readwrite'
        );
        const store = transaction.objectStore(
          CHECK_IN_QUEUE_DRAIN_LOCK_STORE_NAME
        );

        transaction.oncomplete = () => {
          db.close();
          resolve();
        };
        transaction.onerror = () => {
          db.close();
          reject(
            transaction.error ?? new Error('큐 drain lock을 해제하지 못했습니다.')
          );
        };
        transaction.onabort = () => {
          db.close();
          reject(transaction.error ?? new Error('큐 drain lock 해제가 중단되었습니다.'));
        };

        const request = store.get(FALLBACK_LOCK_ID);
        request.onerror = () => {
          transaction.abort();
        };
        request.onsuccess = () => {
          const currentLock: unknown = request.result;

          if (
            !isDrainLockRecord(currentLock) ||
            currentLock.ownerId !== ownerId
          ) {
            return;
          }

          const deleteRequest = store.delete(FALLBACK_LOCK_ID);
          deleteRequest.onerror = () => {
            transaction.abort();
          };
        };
      })
  );

const withFallbackLock = async <T>(
  action: () => Promise<T>,
  lockedResult: T
): Promise<T> => {
  const ownerId = createOwnerId();
  const acquired = await acquireFallbackLock(ownerId);

  if (!acquired) return lockedResult;

  try {
    return await action();
  } finally {
    await releaseFallbackLock(ownerId);
  }
};

export const withCheckInQueueDrainLock = async <T>(
  action: () => Promise<T>,
  lockedResult: T
): Promise<T> => {
  if (typeof navigator !== 'undefined' && navigator.locks) {
    return navigator.locks.request(
      WEB_LOCK_NAME,
      { mode: 'exclusive' },
      action
    );
  }

  if (typeof indexedDB === 'undefined') return lockedResult;

  return withFallbackLock(action, lockedResult);
};
