const CHECK_IN_QUEUE_DRAIN_EVENT = 'gujeuk-check-in:queue-drain-requested';

export const requestCheckInQueueDrain = () => {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(new Event(CHECK_IN_QUEUE_DRAIN_EVENT));
};

export const subscribeCheckInQueueDrain = (listener: () => void) => {
  if (typeof window === 'undefined') {
    return () => {};
  }

  window.addEventListener(CHECK_IN_QUEUE_DRAIN_EVENT, listener);

  return () => {
    window.removeEventListener(CHECK_IN_QUEUE_DRAIN_EVENT, listener);
  };
};
