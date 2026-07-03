import { useEffect } from 'react';
import {
  createExistingUserCheckIn,
  createPublicUserVisit,
  CreateUserVisitRequest,
  deleteQueuedCheckIn,
  getRetryableCheckIns,
  markCheckInFailed,
  markCheckInSyncing,
  recoverSyncingCheckIns,
  signUpPublicUser,
} from '@entities/visit';
import { getApiErrorMessage } from '@shared/api';

const SYNC_INTERVAL_MS = 1000;

let isSyncing = false;

const submitQueuedCheckIn = async (
  item: Awaited<ReturnType<typeof markCheckInSyncing>>
) => {
  if (!('kind' in item.payload)) {
    await createPublicUserVisit(item.payload as CreateUserVisitRequest);
    return;
  }

  switch (item.payload.kind) {
    case 'existing-user-check-in':
      await createExistingUserCheckIn(item.payload.payload);
      return;
    case 'new-user-sign-up':
      await signUpPublicUser(item.payload.payload);
      return;
    case 'legacy-public-visit':
      await createPublicUserVisit(item.payload.payload);
      return;
    default:
      throw new Error('지원하지 않는 체크인 대기 항목입니다.');
  }
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
        await submitQueuedCheckIn(syncingItem);
        await deleteQueuedCheckIn(syncingItem.id);
      } catch (error) {
        await markCheckInFailed(syncingItem, getApiErrorMessage(error));
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
