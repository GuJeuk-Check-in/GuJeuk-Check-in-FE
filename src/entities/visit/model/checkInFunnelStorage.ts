import type {
  ActiveCheckInFunnelSession,
  CheckInFunnelEventRecord,
} from './checkInFunnelAnalytics';

const ACTIVE_SESSION_STORAGE_KEY = 'gujeuk:check-in-funnel-active-session';
const EVENT_STORAGE_KEY = 'gujeuk:check-in-funnel-events';

const isStorageRecoverableError = (error: unknown): boolean =>
  error instanceof SyntaxError ||
  error instanceof TypeError ||
  error instanceof DOMException;

const isRecordObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isStoredCheckInFunnelEventRecord = (
  value: unknown
): value is CheckInFunnelEventRecord => {
  if (!isRecordObject(value)) return false;

  return (
    typeof value.sessionId === 'string' &&
    typeof value.eventName === 'string' &&
    typeof value.occurredAt === 'string' &&
    typeof value.elapsedMsFromStart === 'number'
  );
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

      return parsed.filter(isStoredCheckInFunnelEventRecord);
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
