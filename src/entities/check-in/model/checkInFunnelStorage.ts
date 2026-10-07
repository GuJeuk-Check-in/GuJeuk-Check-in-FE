import type {
  ActiveCheckInFunnelSession,
  CheckInFunnelEventRecord,
} from './checkInFunnelTypes';
import { isAgeType } from './age';

const ACTIVE_SESSION_STORAGE_KEY = 'gujeuk:check-in-funnel-active-session';
const EVENT_STORAGE_KEY = 'gujeuk:check-in-funnel-events';

const isStorageRecoverableError = (error: unknown): boolean =>
  error instanceof SyntaxError ||
  error instanceof TypeError ||
  error instanceof DOMException;

const isRecordObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isNullableAgeType = (
  value: unknown
): value is CheckInFunnelEventRecord['ageGroup'] =>
  value === null || isAgeType(value);

const isVisitCountBucket = (
  value: unknown
): value is CheckInFunnelEventRecord['visitCountBucket'] =>
  value === null ||
  value === 'FIRST_VISIT' ||
  value === 'RETURNING_2_3' ||
  value === 'RETURNING_4_9' ||
  value === 'RETURNING_10_PLUS';

const isCheckInFunnelEventName = (
  value: unknown
): value is CheckInFunnelEventRecord['eventName'] =>
  value === 'check_in_page_view' ||
  value === 'phone_input_started' ||
  value === 'user_check_submitted' ||
  value === 'user_check_succeeded' ||
  value === 'user_check_failed' ||
  value === 'check_in_form_view' ||
  value === 'purpose_selected' ||
  value === 'check_in_submitted' ||
  value === 'check_in_api_succeeded' ||
  value === 'check_in_api_failed' ||
  value === 'check_in_completed_view' ||
  value === 'check_in_abandoned';

const createLegacyClientEventId = (
  value: Record<string, unknown>
): string | null => {
  if (
    typeof value.sessionId !== 'string' ||
    typeof value.eventName !== 'string' ||
    typeof value.occurredAt !== 'string' ||
    typeof value.elapsedMsFromStart !== 'number'
  ) {
    return null;
  }

  return [
    'legacy',
    value.sessionId,
    value.eventName,
    value.occurredAt,
    value.elapsedMsFromStart,
  ].join(':');
};

const parseStoredCheckInFunnelEventRecord = (
  value: unknown
): CheckInFunnelEventRecord | null => {
  if (!isRecordObject(value)) return null;

  const clientEventId =
    typeof value.clientEventId === 'string'
      ? value.clientEventId
      : createLegacyClientEventId(value);

  const ageGroup = value.ageGroup ?? null;
  const visitCountBucket = value.visitCountBucket ?? null;

  if (
    clientEventId === null ||
    typeof value.sessionId !== 'string' ||
    !isCheckInFunnelEventName(value.eventName) ||
    typeof value.occurredAt !== 'string' ||
    typeof value.elapsedMsFromStart !== 'number' ||
    !isNullableAgeType(ageGroup) ||
    !isVisitCountBucket(visitCountBucket)
  ) {
    return null;
  }

  return {
    clientEventId,
    sessionId: value.sessionId,
    eventName: value.eventName,
    occurredAt: value.occurredAt,
    elapsedMsFromStart: value.elapsedMsFromStart,
    userId: typeof value.userId === 'number' ? value.userId : null,
    ageGroup,
    isExistingUser:
      typeof value.isExistingUser === 'boolean' ? value.isExistingUser : null,
    visitCountBucket,
    purpose: typeof value.purpose === 'string' ? value.purpose : null,
    failureReason:
      typeof value.failureReason === 'string' ? value.failureReason : null,
  };
};

const parseActiveSession = (
  value: unknown
): ActiveCheckInFunnelSession | null => {
  if (!isRecordObject(value)) return null;

  if (
    typeof value.sessionId !== 'string' ||
    typeof value.startedAt !== 'string' ||
    typeof value.startedAtMs !== 'number'
  ) {
    return null;
  }

  return {
    sessionId: value.sessionId,
    startedAt: value.startedAt,
    startedAtMs: value.startedAtMs,
    context: value.context,
  };
};

export const readActiveCheckInFunnelSession =
  (): ActiveCheckInFunnelSession | null => {
    try {
      const stored = localStorage.getItem(ACTIVE_SESSION_STORAGE_KEY);
      if (!stored) return null;

      return parseActiveSession(JSON.parse(stored));
    } catch (error) {
      if (isStorageRecoverableError(error)) return null;
      throw error;
    }
  };

export const writeActiveCheckInFunnelSession = (
  session: ActiveCheckInFunnelSession
): void => {
  try {
    localStorage.setItem(ACTIVE_SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch (error) {
    if (isStorageRecoverableError(error)) return;
    throw error;
  }
};

export const clearActiveCheckInFunnelSession = (): void => {
  try {
    localStorage.removeItem(ACTIVE_SESSION_STORAGE_KEY);
  } catch (error) {
    if (isStorageRecoverableError(error)) return;
    throw error;
  }
};

export const readStoredCheckInFunnelEvents =
  (): readonly CheckInFunnelEventRecord[] => {
    try {
      const stored = localStorage.getItem(EVENT_STORAGE_KEY);
      if (!stored) return [];

      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) return [];

      return parsed
        .map(parseStoredCheckInFunnelEventRecord)
        .filter((event): event is CheckInFunnelEventRecord => event !== null);
    } catch (error) {
      if (isStorageRecoverableError(error)) return [];
      throw error;
    }
  };

export const writeStoredCheckInFunnelEvents = (
  events: readonly CheckInFunnelEventRecord[]
): void => {
  try {
    localStorage.setItem(EVENT_STORAGE_KEY, JSON.stringify(events));
  } catch (error) {
    if (isStorageRecoverableError(error)) return;
    throw error;
  }
};

export const removeStoredCheckInFunnelEvents = (
  clientEventIds: readonly string[]
): void => {
  const removals = new Set(clientEventIds);
  writeStoredCheckInFunnelEvents(
    readStoredCheckInFunnelEvents().filter(
      (event) => !removals.has(event.clientEventId)
    )
  );
};
