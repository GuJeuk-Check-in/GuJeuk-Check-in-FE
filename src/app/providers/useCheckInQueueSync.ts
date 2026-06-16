import { useEffect } from 'react';
import {
  createPublicUserVisit,
  deleteQueuedCheckIn,
  getRetryableCheckIns,
  markCheckInFailed,
  markCheckInSyncing,
  recoverSyncingCheckIns,
} from '@entities/visit';

const SYNC_INTERVAL_MS = 10 * 60 * 1000;

let isSyncing = false;

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  return '알 수 없는 동기화 오류가 발생했습니다.';
};

const syncCheckInQueue = async () => {
  if (isSyncing) return;

  isSyncing = true;

  try {
    await recoverSyncingCheckIns();

    const retryableItems = await getRetryableCheckIns();

    for (const item of retryableItems) {
      const syncingItem = await markCheckInSyncing(item);

      try {
        await createPublicUserVisit(syncingItem.payload);
        await deleteQueuedCheckIn(syncingItem.id);
      } catch (error) {
        await markCheckInFailed(syncingItem, getErrorMessage(error));
      }
    }
  } finally {
    isSyncing = false;
  }
};

export const useCheckInQueueSync = () => {
  useEffect(() => {
    const intervalId = window.setInterval(syncCheckInQueue, SYNC_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);
};
