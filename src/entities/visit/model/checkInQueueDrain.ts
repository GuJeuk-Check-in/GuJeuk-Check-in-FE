import {
  createExistingUserCheckIn,
  signUpPublicUser,
} from '../api/visit.api';
import {
  getCheckInQueueErrorMessage,
  getNextRetryAt,
  isRetryableCheckInError,
} from './checkInRetryPolicy';
import {
  deleteCheckInQueueRecord,
  getDueCheckInQueueRecords,
  markCheckInQueueRecordFailed,
  markCheckInQueueRecordSyncing,
} from './checkInQueueStorage';
import {
  CHECK_IN_QUEUE_KINDS,
  type CheckInQueueRecord,
} from './checkInQueueTypes';

const DRAIN_BATCH_LIMIT = 5;

export type CheckInQueueDrainResult = {
  readonly sentCount: number;
  readonly stoppedOnError: boolean;
};

let activeDrain: Promise<CheckInQueueDrainResult> | null = null;

const sendQueuedCheckIn = async (record: CheckInQueueRecord): Promise<void> => {
  switch (record.kind) {
    case CHECK_IN_QUEUE_KINDS.EXISTING_USER_CHECK_IN:
      await createExistingUserCheckIn(record.payload);
      return;
    case CHECK_IN_QUEUE_KINDS.NEW_USER_SIGN_UP:
      await signUpPublicUser(record.payload);
      return;
  }
};

const runDrain = async (): Promise<CheckInQueueDrainResult> => {
  const now = Date.now();
  const dueRecords = await getDueCheckInQueueRecords(now, DRAIN_BATCH_LIMIT);
  let sentCount = 0;

  for (const record of dueRecords) {
    await markCheckInQueueRecordSyncing(record, Date.now());

    try {
      await sendQueuedCheckIn(record);
      await deleteCheckInQueueRecord(record.id);
      sentCount += 1;
    } catch (error) {
      const retryable = isRetryableCheckInError(error);
      const failedAt = Date.now();
      const nextRetryAt = retryable
        ? getNextRetryAt(record.attemptCount + 1, failedAt)
        : null;

      await markCheckInQueueRecordFailed(
        record,
        getCheckInQueueErrorMessage(error),
        nextRetryAt,
        failedAt
      );

      return { sentCount, stoppedOnError: true };
    }
  }

  return { sentCount, stoppedOnError: false };
};

export const drainCheckInQueue = (): Promise<CheckInQueueDrainResult> => {
  if (activeDrain) return activeDrain;

  activeDrain = runDrain().finally(() => {
    activeDrain = null;
  });

  return activeDrain;
};
