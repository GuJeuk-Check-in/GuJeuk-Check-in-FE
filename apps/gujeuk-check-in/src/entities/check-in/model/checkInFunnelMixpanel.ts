import mixpanel from 'mixpanel-browser/src/loaders/loader-module-core';
import {
  CHECK_IN_FUNNEL_EVENT_NAMES,
  type CheckInFunnelEventRecord,
} from './checkInFunnelTypes';

type MixpanelEventPropertyValue = string | number | boolean;

type MixpanelTrackResult =
  | 'tracked'
  | 'skipped'
  | 'failed'
  | 'not_applicable';

type MixpanelEventPayload = {
  readonly eventName: MixpanelCheckInEventName;
  readonly properties: Record<string, MixpanelEventPropertyValue>;
};

type CheckInFunnelMixpanelProperties = {
  readonly client_event_id: string;
  readonly session_id: string;
  readonly occurred_at: string;
  readonly elapsed_ms_from_start: number;
  readonly age_group: string | null;
  readonly is_existing_user: boolean | null;
  readonly visit_count_bucket: string | null;
  readonly purpose: string | null;
  readonly failure_reason: string | null;
  readonly analytics_source: 'check_in_funnel';
};

const CHECK_IN_FUNNEL_TRACK_TIMEOUT_MS = 5_000;
const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN?.trim() ?? '';
const MIXPANEL_CHECK_IN_EVENT_NAMES = {
  CHECK_IN_STARTED: 'check_in_started',
  PHONE_INPUT_STARTED: 'phone_input_started',
  PHONE_CHECK_SUBMITTED: 'phone_check_submitted',
  USER_CHECK_SUCCEEDED: 'user_check_succeeded',
  USER_CHECK_FAILED: 'user_check_failed',
  CHECK_IN_FORM_VIEWED: 'check_in_form_viewed',
  PURPOSE_SELECTED: 'purpose_selected',
  CHECK_IN_SUBMITTED: 'check_in_submitted',
  SIGN_UP_COMPLETED: 'sign_up_completed',
  CHECK_IN_FAILED: 'check_in_failed',
  CHECK_IN_COMPLETED: 'check_in_completed',
  CHECK_IN_ABANDONED: 'check_in_abandoned',
} as const;

type MixpanelCheckInEventName =
  (typeof MIXPANEL_CHECK_IN_EVENT_NAMES)[keyof typeof MIXPANEL_CHECK_IN_EVENT_NAMES];

let isMixpanelInitialized = false;

const isBrowserRuntime = (): boolean => typeof window !== 'undefined';

const isTrackResponseSuccess = (response: unknown): boolean => {
  if (response === 1) return true;
  if (typeof response !== 'object' || response === null) return false;
  if (!('status' in response)) return false;
  return response.status === 1;
};

type MixpanelInitializationResult = 'ready' | 'skipped' | 'failed';

const ensureMixpanelInitialized = (): MixpanelInitializationResult => {
  if (!isBrowserRuntime() || MIXPANEL_TOKEN.length === 0) return 'skipped';
  if (isMixpanelInitialized) return 'ready';

  try {
    mixpanel.init(MIXPANEL_TOKEN, {
      autocapture: false,
      debug: import.meta.env.VITE_MIXPANEL_DEBUG === 'true',
      disable_notifications: true,
      persistence: 'localStorage',
      record_heatmap_data: false,
      record_sessions_percent: 0,
      track_pageview: false,
    });
    isMixpanelInitialized = true;
  } catch (error) {
    if (error instanceof Error) return 'failed';
    throw error;
  }

  return 'ready';
};

const omitEmptyProperties = (
  properties: CheckInFunnelMixpanelProperties
): Record<string, MixpanelEventPropertyValue> =>
  Object.fromEntries(
    Object.entries(properties).filter(
      (entry): entry is [string, MixpanelEventPropertyValue] =>
        entry[1] !== null && entry[1] !== ''
    )
  );

const toBaseMixpanelProperties = (
  event: CheckInFunnelEventRecord
): CheckInFunnelMixpanelProperties => ({
  client_event_id: event.clientEventId,
  session_id: event.sessionId,
  occurred_at: event.occurredAt,
  elapsed_ms_from_start: event.elapsedMsFromStart,
  age_group: event.ageGroup,
  is_existing_user: event.isExistingUser,
  visit_count_bucket: event.visitCountBucket,
  purpose: event.purpose,
  failure_reason: event.failureReason,
  analytics_source: 'check_in_funnel',
});

const toMixpanelEventPayload = (
  event: CheckInFunnelEventRecord
): readonly MixpanelEventPayload[] => {
  const baseProperties = omitEmptyProperties(toBaseMixpanelProperties(event));
  const properties = {
    ...baseProperties,
    platform: 'web',
  };

  switch (event.eventName) {
    case CHECK_IN_FUNNEL_EVENT_NAMES.CHECK_IN_PAGE_VIEW:
      return [
        {
          eventName: MIXPANEL_CHECK_IN_EVENT_NAMES.CHECK_IN_STARTED,
          properties,
        },
      ];

    case CHECK_IN_FUNNEL_EVENT_NAMES.PHONE_INPUT_STARTED:
      return [
        {
          eventName: MIXPANEL_CHECK_IN_EVENT_NAMES.PHONE_INPUT_STARTED,
          properties,
        },
      ];

    case CHECK_IN_FUNNEL_EVENT_NAMES.USER_CHECK_SUBMITTED:
      return [
        {
          eventName: MIXPANEL_CHECK_IN_EVENT_NAMES.PHONE_CHECK_SUBMITTED,
          properties,
        },
      ];

    case CHECK_IN_FUNNEL_EVENT_NAMES.USER_CHECK_SUCCEEDED:
      return [
        {
          eventName: MIXPANEL_CHECK_IN_EVENT_NAMES.USER_CHECK_SUCCEEDED,
          properties,
        },
      ];

    case CHECK_IN_FUNNEL_EVENT_NAMES.USER_CHECK_FAILED:
      return [
        {
          eventName: MIXPANEL_CHECK_IN_EVENT_NAMES.USER_CHECK_FAILED,
          properties,
        },
      ];

    case CHECK_IN_FUNNEL_EVENT_NAMES.CHECK_IN_FORM_VIEW:
      return [
        {
          eventName: MIXPANEL_CHECK_IN_EVENT_NAMES.CHECK_IN_FORM_VIEWED,
          properties,
        },
      ];

    case CHECK_IN_FUNNEL_EVENT_NAMES.PURPOSE_SELECTED:
      return [
        {
          eventName: MIXPANEL_CHECK_IN_EVENT_NAMES.PURPOSE_SELECTED,
          properties,
        },
      ];

    case CHECK_IN_FUNNEL_EVENT_NAMES.CHECK_IN_SUBMITTED:
      return [
        {
          eventName: MIXPANEL_CHECK_IN_EVENT_NAMES.CHECK_IN_SUBMITTED,
          properties,
        },
      ];

    case CHECK_IN_FUNNEL_EVENT_NAMES.CHECK_IN_API_FAILED:
      return [
        {
          eventName: MIXPANEL_CHECK_IN_EVENT_NAMES.CHECK_IN_FAILED,
          properties,
        },
      ];

    case CHECK_IN_FUNNEL_EVENT_NAMES.CHECK_IN_COMPLETED_VIEW:
      return [
        {
          eventName: MIXPANEL_CHECK_IN_EVENT_NAMES.CHECK_IN_COMPLETED,
          properties,
        },
      ];

    case CHECK_IN_FUNNEL_EVENT_NAMES.CHECK_IN_ABANDONED:
      return [
        {
          eventName: MIXPANEL_CHECK_IN_EVENT_NAMES.CHECK_IN_ABANDONED,
          properties,
        },
      ];

    case CHECK_IN_FUNNEL_EVENT_NAMES.CHECK_IN_API_SUCCEEDED:
      if (event.isExistingUser === false) {
        return [
          {
            eventName: MIXPANEL_CHECK_IN_EVENT_NAMES.SIGN_UP_COMPLETED,
            properties: {
              ...properties,
              sign_up_method: 'check_in_form',
            },
          },
        ];
      }

      return [];

    default:
      return [];
  }
};

const trackMixpanelPayload = (
  payload: MixpanelEventPayload
): Promise<boolean> =>
  new Promise((resolve) => {
    const timeoutId = window.setTimeout(() => {
      resolve(false);
    }, CHECK_IN_FUNNEL_TRACK_TIMEOUT_MS);

    try {
      const trackResult = Reflect.apply(mixpanel.track, mixpanel, [
        payload.eventName,
        payload.properties,
        { send_immediately: true, transport: 'sendBeacon' },
        (response: unknown) => {
          window.clearTimeout(timeoutId);
          resolve(isTrackResponseSuccess(response));
        },
      ]);

      if (trackResult !== undefined) {
        window.clearTimeout(timeoutId);
        resolve(trackResult !== false);
      }
    } catch (error) {
      window.clearTimeout(timeoutId);
      if (error instanceof Error) {
        resolve(false);
        return;
      }

      throw error;
    }
  });

export const trackCheckInFunnelEventWithMixpanel = async (
  event: CheckInFunnelEventRecord
): Promise<MixpanelTrackResult> => {
  const payloads = toMixpanelEventPayload(event);
  if (payloads.length === 0) return 'not_applicable';
  const initializationResult = ensureMixpanelInitialized();
  if (initializationResult !== 'ready') return initializationResult;

  const results = await Promise.all(payloads.map(trackMixpanelPayload));
  return results.every(Boolean) ? 'tracked' : 'failed';
};
