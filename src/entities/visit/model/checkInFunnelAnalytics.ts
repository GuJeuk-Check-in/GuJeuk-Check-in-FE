import type { AgeType } from './types';
import {
  clearActiveCheckInFunnelSession,
  readActiveCheckInFunnelSession,
  readStoredCheckInFunnelEvents,
  writeActiveCheckInFunnelSession,
  writeStoredCheckInFunnelEvents,
} from './checkInFunnelStorage';

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

type RecordCheckInFunnelEventInput = Partial<CheckInFunnelContext> & {
  readonly eventName: CheckInFunnelEventName;
  readonly failureReason?: string | null;
};

const YEAR_PREFIX_PATTERN = /^(\d{4})-/;
const CHECK_IN_FUNNEL_EVENT_NAME_VALUES: readonly string[] = Object.values(
  CHECK_IN_FUNNEL_EVENT_NAMES
);

const EMPTY_CONTEXT: CheckInFunnelContext = {
  userId: null,
  ageGroup: null,
  isExistingUser: null,
  visitCountBucket: null,
  purpose: null,
};

const createSessionId = (): string => {
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const isRecordObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isAgeType = (value: unknown): value is AgeType =>
  value === 'BABY' ||
  value === 'AGE_9_13' ||
  value === 'AGE_14_16' ||
  value === 'AGE_17_19' ||
  value === 'AGE_20_24' ||
  value === 'ADULT';

const isVisitCountBucket = (value: unknown): value is CheckInVisitCountBucket =>
  value === 'FIRST_VISIT' ||
  value === 'RETURNING_2_3' ||
  value === 'RETURNING_4_9' ||
  value === 'RETURNING_10_PLUS';

const parseContext = (value: unknown): CheckInFunnelContext => {
  if (!isRecordObject(value)) return EMPTY_CONTEXT;

  return {
    userId: typeof value.userId === 'number' ? value.userId : null,
    ageGroup: isAgeType(value.ageGroup) ? value.ageGroup : null,
    isExistingUser:
      typeof value.isExistingUser === 'boolean' ? value.isExistingUser : null,
    visitCountBucket: isVisitCountBucket(value.visitCountBucket)
      ? value.visitCountBucket
      : null,
    purpose: typeof value.purpose === 'string' ? value.purpose : null,
  };
};

const isCheckInFunnelEventName = (
  value: unknown
): value is CheckInFunnelEventName =>
  typeof value === 'string' &&
  CHECK_IN_FUNNEL_EVENT_NAME_VALUES.includes(value);

const appendEvent = (event: CheckInFunnelEventRecord): void => {
  writeStoredCheckInFunnelEvents([...readStoredCheckInFunnelEvents(), event]);
};

const createEventRecord = (
  session: ActiveCheckInFunnelSession,
  input: RecordCheckInFunnelEventInput,
  nowMs = Date.now()
): CheckInFunnelEventRecord => {
  const sessionContext = parseContext(session.context);
  const context = {
    userId: input.userId ?? sessionContext.userId,
    ageGroup: input.ageGroup ?? sessionContext.ageGroup,
    isExistingUser: input.isExistingUser ?? sessionContext.isExistingUser,
    visitCountBucket: input.visitCountBucket ?? sessionContext.visitCountBucket,
    purpose: input.purpose ?? sessionContext.purpose,
  };

  return {
    ...context,
    sessionId: session.sessionId,
    eventName: input.eventName,
    occurredAt: new Date(nowMs).toISOString(),
    elapsedMsFromStart: Math.max(0, nowMs - session.startedAtMs),
    failureReason: input.failureReason ?? null,
  };
};

const mergeContext = (
  current: CheckInFunnelContext,
  input: Partial<CheckInFunnelContext>
): CheckInFunnelContext => ({
  userId: input.userId ?? current.userId,
  ageGroup: input.ageGroup ?? current.ageGroup,
  isExistingUser: input.isExistingUser ?? current.isExistingUser,
  visitCountBucket: input.visitCountBucket ?? current.visitCountBucket,
  purpose: input.purpose ?? current.purpose,
});

export const beginCheckInFunnelSession = (): void => {
  const previousSession = readActiveCheckInFunnelSession();

  if (previousSession) {
    appendEvent(
      createEventRecord(previousSession, {
        eventName: CHECK_IN_FUNNEL_EVENT_NAMES.CHECK_IN_ABANDONED,
        failureReason: 'new_session_started',
      })
    );
  }

  const nowMs = Date.now();
  const session: ActiveCheckInFunnelSession = {
    sessionId: createSessionId(),
    startedAt: new Date(nowMs).toISOString(),
    startedAtMs: nowMs,
    context: EMPTY_CONTEXT,
  };

  writeActiveCheckInFunnelSession(session);
  appendEvent(
    createEventRecord(
      session,
      { eventName: CHECK_IN_FUNNEL_EVENT_NAMES.CHECK_IN_PAGE_VIEW },
      nowMs
    )
  );
};

export const ensureCheckInFunnelSession = (): void => {
  if (readActiveCheckInFunnelSession()) return;
  beginCheckInFunnelSession();
};

export const recordCheckInFunnelEvent = (
  input: RecordCheckInFunnelEventInput
): void => {
  const session = readActiveCheckInFunnelSession();
  if (!session) return;

  const nowMs = Date.now();

  if (nowMs - session.startedAtMs > CHECK_IN_FUNNEL_TIMEOUT_MS) {
    appendEvent(
      createEventRecord(
        session,
        {
          eventName: CHECK_IN_FUNNEL_EVENT_NAMES.CHECK_IN_ABANDONED,
          failureReason: 'timeout_over_7m',
        },
        nowMs
      )
    );
    clearActiveCheckInFunnelSession();
    return;
  }

  const event = createEventRecord(session, input, nowMs);
  appendEvent(event);

  writeActiveCheckInFunnelSession({
    ...session,
    context: mergeContext(parseContext(session.context), input),
  });
};

export const completeCheckInFunnelSession = (): void => {
  recordCheckInFunnelEvent({
    eventName: CHECK_IN_FUNNEL_EVENT_NAMES.CHECK_IN_COMPLETED_VIEW,
  });
  clearActiveCheckInFunnelSession();
};

export const getAgeGroupFromBirthYMD = (
  birthYMD: string,
  visitTime: string
): AgeType | null => {
  const birthYear = parseYear(birthYMD);
  const visitYear = parseYear(visitTime);

  if (birthYear === null || visitYear === null || visitYear < birthYear) {
    return null;
  }

  const koreanAge = visitYear - birthYear + 1;
  if (koreanAge <= 8) return 'BABY';
  if (koreanAge <= 13) return 'AGE_9_13';
  if (koreanAge <= 16) return 'AGE_14_16';
  if (koreanAge <= 19) return 'AGE_17_19';
  if (koreanAge <= 24) return 'AGE_20_24';
  return 'ADULT';
};

const parseYear = (value: string): number | null => {
  const match = YEAR_PREFIX_PATTERN.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  return Number.isInteger(year) ? year : null;
};
