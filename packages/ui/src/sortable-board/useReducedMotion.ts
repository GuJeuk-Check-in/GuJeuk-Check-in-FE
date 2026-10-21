import { useSyncExternalStore } from 'react';

const subscribe = (onChange: () => void) => {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
};

export const useReducedMotion = () => useSyncExternalStore(
  subscribe,
  () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  () => false,
);
