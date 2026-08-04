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
const READY_HEALTH_RECOVERY_POLL_INTERVAL_MS = 5_000;
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
    let pollIntervalMs = READY_HEALTH_POLL_INTERVAL_MS;
    let timeoutId: number | null = null;

    const clearScheduledCheck = () => {
      if (timeoutId === null) return;

      window.clearTimeout(timeoutId);
      timeoutId = null;
    };

    const scheduleNextCheck = () => {
      clearScheduledCheck();

      if (disposed) return;

      timeoutId = window.setTimeout(
        () => void checkReadiness(),
        pollIntervalMs
      );
    };

    const applyReadyState = async (readyForRemoteSync: boolean) => {
      if (disposed) return;

      if (!readyForRemoteSync) {
        wasReadyForRemoteSync = false;
        pollIntervalMs = READY_HEALTH_RECOVERY_POLL_INTERVAL_MS;
        setRemoteSyncAvailability(REMOTE_SYNC_AVAILABILITY.UNREADY);
        await cancelRemoteSyncQueries(queryClient);
        return;
      }

      const recovered = !wasReadyForRemoteSync;
      wasReadyForRemoteSync = true;
      pollIntervalMs = READY_HEALTH_POLL_INTERVAL_MS;
      setRemoteSyncAvailability(REMOTE_SYNC_AVAILABILITY.READY);

      if (recovered) {
        await invalidateRemoteSyncQueries(queryClient);
      }

      await drainCheckInQueue().catch(() => undefined);
    };

    const checkReadiness = async (): Promise<void> => {
      if (requestInFlight || disposed) return;
      clearScheduledCheck();
      requestInFlight = true;

      try {
        const health = await fetchReadyHealth().catch(() => null);
        await applyReadyState(health !== null && isReadyForRemoteSync(health));
      } finally {
        requestInFlight = false;
        scheduleNextCheck();
      }
    };

    void checkReadiness();
    const checkOnOnline = () => void checkReadiness();
    window.addEventListener('online', checkOnOnline);

    return () => {
      disposed = true;
      clearScheduledCheck();
      window.removeEventListener('online', checkOnOnline);
    };
  }, [queryClient]);
};
