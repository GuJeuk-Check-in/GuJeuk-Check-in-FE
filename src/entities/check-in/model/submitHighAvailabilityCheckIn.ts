import { enqueueCheckIn } from './checkInQueueStorage';
import { CHECK_IN_QUEUE_KINDS } from './checkInQueueTypes';
import { createClientRecordId } from './clientRecordId';
import {
  CHECK_IN_SUBMISSION_OUTCOMES,
  completeCheckInSubmission,
  createCheckInSubmissionFailure,
  type CheckInSubmissionResult,
} from './checkInSubmissionResult';
import type { NewUserSignUpRequest } from './types';

export const submitHighAvailabilityCheckIn = async (
  payload: NewUserSignUpRequest
): Promise<CheckInSubmissionResult> => {
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
    return createCheckInSubmissionFailure(
      CHECK_IN_SUBMISSION_OUTCOMES.LOCAL_QUEUE_SAVE_FAILED,
      error
    );
  }

  return completeCheckInSubmission(clientRecordId);
};
