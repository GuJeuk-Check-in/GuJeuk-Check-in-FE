import type { AgeType } from './age';

export const CHECK_IN_FUNNEL_TIMEOUT_MS = 7 * 60 * 1000;

export const CHECK_IN_FUNNEL_EVENT_NAMES = {
  CHECK_IN_PAGE_VIEW: 'check_in_page_view',
  PHONE_INPUT_STARTED: 'phone_input_started',
  USER_CHECK_SUBMITTED: 'user_check_submitted',
  USER_CHECK_SUCCEEDED: 'user_check_succeeded',
  USER_CHECK_FAILED: 'user_check_failed',
  CHECK_IN_FORM_VIEW: 'check_in_form_view',
  PURPOSE_SELECTED: 'purpose_selected',
  CHECK_IN_SUBMITTED: 'check_in_submitted',
  CHECK_IN_API_SUCCEEDED: 'check_in_api_succeeded',
  CHECK_IN_API_FAILED: 'check_in_api_failed',
  CHECK_IN_COMPLETED_VIEW: 'check_in_completed_view',
  CHECK_IN_ABANDONED: 'check_in_abandoned',
} as const;

export type CheckInFunnelEventName =
  (typeof CHECK_IN_FUNNEL_EVENT_NAMES)[keyof typeof CHECK_IN_FUNNEL_EVENT_NAMES];

export type CheckInVisitCountBucket =
  | 'FIRST_VISIT'
  | 'RETURNING_2_3'
  | 'RETURNING_4_9'
  | 'RETURNING_10_PLUS';

export type CheckInFunnelContext = {
  readonly userId: number | null;
  readonly ageGroup: AgeType | null;
  readonly isExistingUser: boolean | null;
  readonly visitCountBucket: CheckInVisitCountBucket | null;
  readonly purpose: string | null;
};

export type CheckInFunnelEventRecord = CheckInFunnelContext & {
  readonly clientEventId: string;
  readonly sessionId: string;
  readonly eventName: CheckInFunnelEventName;
  readonly occurredAt: string;
  readonly elapsedMsFromStart: number;
  readonly failureReason: string | null;
};

export type ActiveCheckInFunnelSession = {
  readonly sessionId: string;
  readonly startedAt: string;
  readonly startedAtMs: number;
  readonly context: unknown;
};
