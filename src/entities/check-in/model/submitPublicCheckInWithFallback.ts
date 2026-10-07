import {
  createExistingUserCheckIn,
  signUpPublicUser,
} from '../api/checkIn.api';
import {
  isCheckInApiError,
  isRetryableCheckInError,
} from './checkInRetryPolicy';
import { enqueueCheckIn } from './checkInQueueStorage';
import {
  CHECK_IN_QUEUE_KINDS,
  type ExistingUserCheckInQueuePayload,
  type NewUserSignUpQueuePayload,
} from './checkInQueueTypes';
import type {
  ExistingUserCheckInRequest,
  NewUserSignUpRequest,
} from './types';
import {
  CHECK_IN_SUBMISSION_OUTCOMES,
  completeCheckInSubmission,
  createCheckInSubmissionFailure,
  type CheckInSubmissionResult,
} from './checkInSubmissionResult';

const enqueueRetryableCheckInSubmission = async (
  queuePayload: ExistingUserCheckInQueuePayload | NewUserSignUpQueuePayload
): Promise<CheckInSubmissionResult> => {
  try {
    await enqueueCheckIn(queuePayload);
  } catch (error) {
    return createCheckInSubmissionFailure(
      CHECK_IN_SUBMISSION_OUTCOMES.LOCAL_QUEUE_SAVE_FAILED,
      error
    );
  }

  return completeCheckInSubmission();
};

export const submitExistingUserCheckInWithFallback = async (
  payload: ExistingUserCheckInRequest
): Promise<CheckInSubmissionResult> => {
  try {
    await createExistingUserCheckIn(payload);
  } catch (error) {
    if (!isCheckInApiError(error)) {
      throw error;
    }

    if (!isRetryableCheckInError(error)) {
      return createCheckInSubmissionFailure(
        CHECK_IN_SUBMISSION_OUTCOMES.SAVE_FAILED,
        error
      );
    }

    return enqueueRetryableCheckInSubmission({
      kind: CHECK_IN_QUEUE_KINDS.EXISTING_USER_CHECK_IN,
      payload,
    });
  }

  return completeCheckInSubmission();
};

export const submitNewUserSignUpWithFallback = async (
  payload: NewUserSignUpRequest
): Promise<CheckInSubmissionResult> => {
  try {
    await signUpPublicUser(payload);
  } catch (error) {
    if (!isCheckInApiError(error)) {
      throw error;
    }

    if (!isRetryableCheckInError(error)) {
      return createCheckInSubmissionFailure(
        CHECK_IN_SUBMISSION_OUTCOMES.SAVE_FAILED,
        error
      );
    }

    return enqueueRetryableCheckInSubmission({
      kind: CHECK_IN_QUEUE_KINDS.NEW_USER_SIGN_UP,
      payload,
    });
  }

  return completeCheckInSubmission();
};
