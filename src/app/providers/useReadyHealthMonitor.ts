import {
  drainCheckInQueue,
  fetchReadyHealth,
  isReadyForRemoteSync,
} from '@entities/visit';
import { useQueryClient, type QueryClient } from '@tanstack/react-query';
import {
  REMOTE_SYNC_AVAILABILITY,
  setRemoteSyncAvailability,
} from '@shared/lib';
import { useEffect } from 'react';

const READY_HEALTH_POLL_INTERVAL_MS = 60_000;
const REMOTE_SYNC_QUERY_KEYS = [
  ['purposeList'],
  ['residenceList'],
  ['publicResidenceList'],
] as const;

const cancelRemoteSyncQueries = async (
  queryClient: QueryClient
): Promise<void> => {
  await Promise.all(
    REMOTE_SYNC_QUERY_KEYS.map((queryKey) =>
      queryClient.cancelQueries({ queryKey })
    )
  );
};

const invalidateRemoteSyncQueries = async (
  queryClient: QueryClient
): Promise<void> => {
  await Promise.all(
    REMOTE_SYNC_QUERY_KEYS.map((queryKey) =>
      queryClient.invalidateQueries({ queryKey })
    )
  );
};

export const useReadyHealthMonitor = (): void => {
  const queryClient = useQueryClient();

  useEffect(() => {
    let requestInFlight = false;
    let disposed = false;
    let wasReadyForRemoteSync = false;

    const applyReadyState = async (readyForRemoteSync: boolean) => {
      if (disposed) return;

      if (!readyForRemoteSync) {
        wasReadyForRemoteSync = false;
        setRemoteSyncAvailability(REMOTE_SYNC_AVAILABILITY.UNREADY);
        await cancelRemoteSyncQueries(queryClient);
        return;
      }

      const recovered = !wasReadyForRemoteSync;
      wasReadyForRemoteSync = true;
      setRemoteSyncAvailability(REMOTE_SYNC_AVAILABILITY.READY);

      if (recovered) {
        await invalidateRemoteSyncQueries(queryClient);
      }

      await drainCheckInQueue().catch(() => undefined);
    };

    const checkReadiness = async (): Promise<void> => {
      if (requestInFlight || disposed) return;
      requestInFlight = true;

      try {
        const health = await fetchReadyHealth().catch(() => null);
        await applyReadyState(health !== null && isReadyForRemoteSync(health));
      } finally {
        requestInFlight = false;
      }
    };

    void checkReadiness();
    const intervalId = window.setInterval(
      () => void checkReadiness(),
      READY_HEALTH_POLL_INTERVAL_MS
    );
    const checkOnOnline = () => void checkReadiness();
    window.addEventListener('online', checkOnOnline);

    return () => {
      disposed = true;
      window.clearInterval(intervalId);
      window.removeEventListener('online', checkOnOnline);
    };
  }, [queryClient]);
};
