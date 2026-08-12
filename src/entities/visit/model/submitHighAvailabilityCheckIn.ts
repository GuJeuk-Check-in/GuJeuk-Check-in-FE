import { getCheckInQueueErrorMessage } from './checkInRetryPolicy';
import { enqueueCheckIn } from './checkInQueueStorage';
import { CHECK_IN_QUEUE_KINDS } from './checkInQueueTypes';
import { createClientRecordId } from './clientRecordId';
import { CheckInFallbackStorageError } from './submitPublicCheckInWithFallback';
import type { NewUserSignUpRequest } from './types';

export const submitHighAvailabilityCheckIn = async (
  payload: NewUserSignUpRequest
): Promise<string> => {
  const clientRecordId = createClientRecordId();

  try {
    await enqueueCheckIn({
      kind: CHECK_IN_QUEUE_KINDS.HIGH_AVAILABILITY_CHECK_IN,
      payload: {
        ...payload,
        clientRecordId,
      },
    });
  } catch (error) {
    throw new CheckInFallbackStorageError(getCheckInQueueErrorMessage(error));
  }

  return clientRecordId;
};
