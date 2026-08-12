import { useSyncExternalStore } from 'react';

export const REMOTE_SYNC_AVAILABILITY = {
  UNKNOWN: 'UNKNOWN',
  READY: 'READY',
  UNREADY: 'UNREADY',
} as const;

export type RemoteSyncAvailability =
  (typeof REMOTE_SYNC_AVAILABILITY)[keyof typeof REMOTE_SYNC_AVAILABILITY];

let currentAvailability: RemoteSyncAvailability =
  REMOTE_SYNC_AVAILABILITY.UNKNOWN;

const listeners = new Set<() => void>();

const subscribe = (listener: () => void): (() => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

export const getRemoteSyncAvailability = (): RemoteSyncAvailability =>
  currentAvailability;

export const setRemoteSyncAvailability = (
  availability: RemoteSyncAvailability
): void => {
  if (currentAvailability === availability) return;

  currentAvailability = availability;
  listeners.forEach((listener) => listener());
};

export const isRemoteSyncReady = (
  availability: RemoteSyncAvailability
): boolean => availability === REMOTE_SYNC_AVAILABILITY.READY;

export const useIsRemoteSyncReady = (): boolean =>
  isRemoteSyncReady(
    useSyncExternalStore(
      subscribe,
      getRemoteSyncAvailability,
      getRemoteSyncAvailability
    )
  );
