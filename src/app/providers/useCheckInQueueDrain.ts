import { useEffect } from 'react';
import {
  drainCheckInQueue,
  subscribeCheckInQueueDrain,
} from '@entities/visit';

export const useCheckInQueueDrain = () => {
  useEffect(() => {
    const drain = () => {
      void drainCheckInQueue();
    };

    drain();

    const unsubscribeDrainRequest = subscribeCheckInQueueDrain(drain);
    window.addEventListener('online', drain);

    return () => {
      unsubscribeDrainRequest();
      window.removeEventListener('online', drain);
    };
  }, []);
};
