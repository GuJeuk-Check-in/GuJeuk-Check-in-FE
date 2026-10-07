import { checkUserExists } from '../api/checkIn.api';
import { isRetryableCheckInError } from './checkInRetryPolicy';

export const CHECK_IN_USER_CHECK_OUTCOMES = {
  EXISTING_USER: 'existing_user',
  FIRST_VISIT_CANDIDATE: 'first_visit_candidate',
  MISSING_EXISTING_USER_ID: 'missing_existing_user_id',
  REMOTE_UNAVAILABLE: 'remote_unavailable',
  REQUEST_FAILED: 'request_failed',
} as const;

export type CheckInUserCheckOutcome =
  (typeof CHECK_IN_USER_CHECK_OUTCOMES)[keyof typeof CHECK_IN_USER_CHECK_OUTCOMES];

export type CheckInUserCheckResult =
  | {
      readonly outcome: typeof CHECK_IN_USER_CHECK_OUTCOMES.EXISTING_USER;
      readonly userId: number;
    }
  | {
      readonly outcome:
        | typeof CHECK_IN_USER_CHECK_OUTCOMES.FIRST_VISIT_CANDIDATE
        | typeof CHECK_IN_USER_CHECK_OUTCOMES.MISSING_EXISTING_USER_ID
        | typeof CHECK_IN_USER_CHECK_OUTCOMES.REMOTE_UNAVAILABLE;
    }
  | {
      readonly outcome: typeof CHECK_IN_USER_CHECK_OUTCOMES.REQUEST_FAILED;
      readonly error: unknown;
    };

export const checkPublicUserForCheckIn = async (
  name: string
): Promise<CheckInUserCheckResult> => {
  try {
    const response = await checkUserExists({ name });

    if (!response.userExists) {
      return {
        outcome: CHECK_IN_USER_CHECK_OUTCOMES.FIRST_VISIT_CANDIDATE,
      };
    }

    if (typeof response.userId !== 'number') {
      return {
        outcome: CHECK_IN_USER_CHECK_OUTCOMES.MISSING_EXISTING_USER_ID,
      };
    }

    return {
      outcome: CHECK_IN_USER_CHECK_OUTCOMES.EXISTING_USER,
      userId: response.userId,
    };
  } catch (error) {
    if (isRetryableCheckInError(error)) {
      return {
        outcome: CHECK_IN_USER_CHECK_OUTCOMES.REMOTE_UNAVAILABLE,
      };
    }

    return {
      outcome: CHECK_IN_USER_CHECK_OUTCOMES.REQUEST_FAILED,
      error,
    };
  }
};
