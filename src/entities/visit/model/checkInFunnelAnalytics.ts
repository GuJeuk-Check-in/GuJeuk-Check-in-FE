import type { AgeType } from './types';
import {
  CHECK_IN_FUNNEL_EVENT_NAMES,
  CHECK_IN_FUNNEL_TIMEOUT_MS,
} from './checkInFunnelTypes';
import type {
  ActiveCheckInFunnelSession,
  CheckInFunnelContext,
  CheckInFunnelEventName,
  CheckInFunnelEventRecord,
  CheckInVisitCountBucket,
} from './checkInFunnelTypes';
import {
  clearActiveCheckInFunnelSession,
  readActiveCheckInFunnelSession,
  readStoredCheckInFunnelEvents,
  writeActiveCheckInFunnelSession,
  writeStoredCheckInFunnelEvents,
} from './checkInFunnelStorage';
import { flushStoredCheckInFunnelEventsInBackground } from './checkInFunnelFlush';

type RecordCheckInFunnelEventInput = Partial<CheckInFunnelContext> & {
  readonly eventName: CheckInFunnelEventName;
  readonly failureReason?: string | null;
};

const YEAR_PREFIX_PATTERN = /^(\d{4})-/;

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

const createClientEventId = (): string => createSessionId();

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

const appendEvent = (event: CheckInFunnelEventRecord): void => {
  writeStoredCheckInFunnelEvents([...readStoredCheckInFunnelEvents(), event]);
  flushStoredCheckInFunnelEventsInBackground();
};

const hasSessionTimedOut = (
  session: ActiveCheckInFunnelSession,
  nowMs: number
): boolean => nowMs - session.startedAtMs > CHECK_IN_FUNNEL_TIMEOUT_MS;

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
    clientEventId: createClientEventId(),
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

const writeNewCheckInFunnelSession = (
  nowMs: number
): ActiveCheckInFunnelSession => {
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

  return session;
};

const recordSessionAbandoned = (
  session: ActiveCheckInFunnelSession,
  failureReason: string,
  nowMs = Date.now()
): void => {
  appendEvent(
    createEventRecord(
      session,
      {
        eventName: CHECK_IN_FUNNEL_EVENT_NAMES.CHECK_IN_ABANDONED,
        failureReason,
      },
      nowMs
    )
  );
  clearActiveCheckInFunnelSession();
};

const recordEventForSession = (
  session: ActiveCheckInFunnelSession,
  input: RecordCheckInFunnelEventInput,
  nowMs: number
): void => {
  const event = createEventRecord(session, input, nowMs);
  appendEvent(event);

  writeActiveCheckInFunnelSession({
    ...session,
    context: mergeContext(parseContext(session.context), input),
  });
};

const shouldRecordEventAfterTimeout = (
  eventName: CheckInFunnelEventName
): boolean =>
  eventName !== CHECK_IN_FUNNEL_EVENT_NAMES.CHECK_IN_COMPLETED_VIEW &&
  eventName !== CHECK_IN_FUNNEL_EVENT_NAMES.CHECK_IN_ABANDONED;

export const beginCheckInFunnelSession = (): void => {
  const previousSession = readActiveCheckInFunnelSession();
  const nowMs = Date.now();

  if (previousSession) {
    recordSessionAbandoned(previousSession, 'new_session_started', nowMs);
  }

  writeNewCheckInFunnelSession(nowMs);
  flushStoredCheckInFunnelEventsInBackground();
};

export const ensureCheckInFunnelSession = (): void => {
  const session = readActiveCheckInFunnelSession();
  if (!session) {
    beginCheckInFunnelSession();
    return;
  }

  const nowMs = Date.now();
  if (!hasSessionTimedOut(session, nowMs)) return;

  recordSessionAbandoned(session, 'timeout_over_7m', nowMs);
  writeNewCheckInFunnelSession(nowMs);
};

export const recordCheckInFunnelEvent = (
  input: RecordCheckInFunnelEventInput
): void => {
  const session = readActiveCheckInFunnelSession();
  if (!session) return;

  const nowMs = Date.now();

  if (hasSessionTimedOut(session, nowMs)) {
    recordSessionAbandoned(session, 'timeout_over_7m', nowMs);
    if (!shouldRecordEventAfterTimeout(input.eventName)) return;

    const newSession = writeNewCheckInFunnelSession(nowMs);
    recordEventForSession(newSession, input, nowMs);
    return;
  }

  recordEventForSession(session, input, nowMs);
};

export const completeCheckInFunnelSession = (): void => {
  recordCheckInFunnelEvent({
    eventName: CHECK_IN_FUNNEL_EVENT_NAMES.CHECK_IN_COMPLETED_VIEW,
  });
  clearActiveCheckInFunnelSession();
  flushStoredCheckInFunnelEventsInBackground();
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
