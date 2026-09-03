import {
  fetchReadyHealth,
  isReadyForRemoteSync,
} from './api/readyHealth.api';
import { drainCheckInQueue } from './model/checkInQueueDrain';

export const fetchCheckInReadyForBootSync = async (): Promise<boolean> => {
  const health = await fetchReadyHealth();

  return isReadyForRemoteSync(health);
};

export const drainCheckInQueueForBootSync = async (): Promise<void> => {
  await drainCheckInQueue();
};
