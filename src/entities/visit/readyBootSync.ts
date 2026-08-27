import {
  fetchReadyHealth,
  isReadyForRemoteSync,
} from './api/readyHealth.api';
import { drainCheckInQueue } from './model/checkInQueueDrain';

export const fetchVisitReadyForBootSync = async (): Promise<boolean> => {
  const health = await fetchReadyHealth();

  return isReadyForRemoteSync(health);
};

export const drainVisitCheckInQueueForBootSync = async (): Promise<void> => {
  await drainCheckInQueue();
};
