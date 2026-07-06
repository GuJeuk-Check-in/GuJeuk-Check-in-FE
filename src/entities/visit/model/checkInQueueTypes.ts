import type {
  ExistingUserCheckInRequest,
  NewUserSignUpRequest,
} from './types';

export const CHECK_IN_QUEUE_KINDS = {
  EXISTING_USER_CHECK_IN: 'existing-user-check-in',
  NEW_USER_SIGN_UP: 'new-user-sign-up',
} as const;

export type CheckInQueueKind =
  (typeof CHECK_IN_QUEUE_KINDS)[keyof typeof CHECK_IN_QUEUE_KINDS];

export const CHECK_IN_QUEUE_STATUSES = {
  PENDING: 'pending',
  SYNCING: 'syncing',
  FAILED: 'failed',
} as const;

export type CheckInQueueStatus =
  (typeof CHECK_IN_QUEUE_STATUSES)[keyof typeof CHECK_IN_QUEUE_STATUSES];

export type ExistingUserCheckInQueuePayload = {
  readonly kind: typeof CHECK_IN_QUEUE_KINDS.EXISTING_USER_CHECK_IN;
  readonly payload: ExistingUserCheckInRequest;
};

export type NewUserSignUpQueuePayload = {
  readonly kind: typeof CHECK_IN_QUEUE_KINDS.NEW_USER_SIGN_UP;
  readonly payload: NewUserSignUpRequest;
};

export type CheckInQueuePayload =
  | ExistingUserCheckInQueuePayload
  | NewUserSignUpQueuePayload;

export type CheckInQueueRecord = CheckInQueuePayload & {
  readonly id: string;
  readonly status: CheckInQueueStatus;
  readonly attemptCount: number;
  readonly lastError: string | null;
  readonly nextRetryAt: number | null;
  readonly createdAt: number;
  readonly updatedAt: number;
};
