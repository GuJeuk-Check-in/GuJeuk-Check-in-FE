import {
  REMOTE_SYNC_AVAILABILITY,
  setRemoteSyncAvailability,
} from './remoteSyncAvailability';

export const markRemoteSyncBootReady = (): void => {
  setRemoteSyncAvailability(REMOTE_SYNC_AVAILABILITY.READY);
};

export const markRemoteSyncBootUnready = (): void => {
  setRemoteSyncAvailability(REMOTE_SYNC_AVAILABILITY.UNREADY);
};
