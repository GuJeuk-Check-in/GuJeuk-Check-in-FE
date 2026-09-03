import {
  readStoredCheckInFunnelEvents,
  removeStoredCheckInFunnelEvents,
} from './checkInFunnelStorage';
import { trackCheckInFunnelEventWithMixpanel } from './checkInFunnelMixpanel';

const CHECK_IN_FUNNEL_FLUSH_BATCH_SIZE = 100;

let activeFlushPromise: Promise<boolean> | null = null;

const flushStoredCheckInFunnelEventsToMixpanel =
  async (): Promise<boolean> => {
    while (true) {
      const events = readStoredCheckInFunnelEvents();
      if (events.length === 0) return true;

      const batch = events.slice(0, CHECK_IN_FUNNEL_FLUSH_BATCH_SIZE);
      const sendResults = await Promise.all(
        batch.map((event) => trackCheckInFunnelEventWithMixpanel(event))
      );
      const removableEventIds = batch
        .filter((_, index) => sendResults[index] !== 'failed')
        .map((event) => event.clientEventId);

      if (removableEventIds.length > 0) {
        removeStoredCheckInFunnelEvents(removableEventIds);
      }

      if (removableEventIds.length !== batch.length) return false;
    }
  };

export const flushStoredCheckInFunnelEvents = async (): Promise<boolean> => {
  if (activeFlushPromise) return activeFlushPromise;

  activeFlushPromise = flushStoredCheckInFunnelEventsToMixpanel();

  try {
    return await activeFlushPromise;
  } catch (error) {
    if (error instanceof Error) return false;
    throw error;
  } finally {
    activeFlushPromise = null;
  }
};

export const flushStoredCheckInFunnelEventsInBackground = (): void => {
  void flushStoredCheckInFunnelEvents();
};
