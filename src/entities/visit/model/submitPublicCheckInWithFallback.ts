import {
  createExistingUserCheckIn,
  signUpPublicUser,
} from '../api/visit.api';
import {
  getCheckInQueueErrorMessage,
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

export class CheckInFallbackStorageError extends Error {
  readonly causeMessage: string;

  constructor(causeMessage: string) {
    super('체크인 정보를 임시 저장하지 못했습니다.');
    this.name = 'CheckInFallbackStorageError';
    this.causeMessage = causeMessage;
  }
}

const enqueueWithFallbackError = async (
  queuePayload: ExistingUserCheckInQueuePayload | NewUserSignUpQueuePayload
): Promise<void> => {
  try {
    await enqueueCheckIn(queuePayload);
  } catch (error) {
    throw new CheckInFallbackStorageError(getCheckInQueueErrorMessage(error));
  }
};

export const submitExistingUserCheckInWithFallback = async (
  payload: ExistingUserCheckInRequest
): Promise<void> => {
  try {
    await createExistingUserCheckIn(payload);
  } catch (error) {
    if (!isRetryableCheckInError(error)) {
      throw error;
    }

    await enqueueWithFallbackError({
      kind: CHECK_IN_QUEUE_KINDS.EXISTING_USER_CHECK_IN,
      payload,
    });
  }
};

export const submitNewUserSignUpWithFallback = async (
  payload: NewUserSignUpRequest
): Promise<void> => {
  try {
    await signUpPublicUser(payload);
  } catch (error) {
    if (!isRetryableCheckInError(error)) {
      throw error;
    }

    await enqueueWithFallbackError({
      kind: CHECK_IN_QUEUE_KINDS.NEW_USER_SIGN_UP,
      payload,
    });
  }
};
