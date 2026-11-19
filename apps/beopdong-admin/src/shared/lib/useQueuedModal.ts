import { useEffect, useRef } from 'react';
import type { ModalConfig, UseModalReturn } from '@center/ui/modal';

export const useQueuedModal = (modal: UseModalReturn, blockers: readonly boolean[]): UseModalReturn => {
  const isBlocked = blockers.some(Boolean);
  const blockedRef = useRef(isBlocked);
  const pending = useRef<ModalConfig | null>(null);
  blockedRef.current = isBlocked;

  useEffect(() => {
    if (isBlocked || !pending.current) return;
    const next = pending.current;
    pending.current = null;
    modal.openModal(next);
  }, [isBlocked, modal]);

  return {
    ...modal,
    openModal: (config) => {
      if (blockedRef.current) pending.current = config;
      else modal.openModal(config);
    },
  };
};
