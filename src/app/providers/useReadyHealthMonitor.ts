import {
  drainCheckInQueue,
  fetchReadyHealth,
  isReadyForRemoteSync,
} from '@entities/visit';
import { useEffect } from 'react';

const READY_HEALTH_POLL_INTERVAL_MS = 60_000;

export const useReadyHealthMonitor = (): void => {
  useEffect(() => {
    let requestInFlight = false;
    let disposed = false;

    const checkReadiness = async (): Promise<void> => {
      if (requestInFlight || disposed) return;
      requestInFlight = true;

      const health = await fetchReadyHealth().catch(() => null);

      if (health && !disposed && isReadyForRemoteSync(health)) {
        await drainCheckInQueue().catch(() => undefined);
      }

      requestInFlight = false;
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
  }, []);
};
