import { useEffect, useRef } from 'react';
import type { ModalConfig, UseModalReturn } from '@center/ui/modal';

export const useQueuedModal = (modal: UseModalReturn, blockers: readonly boolean[]): UseModalReturn => {
  const isBlocked = blockers.some(Boolean) || modal.isOpen;
  const blockedRef = useRef(isBlocked);
  const queue = useRef<ModalConfig[]>([]);
  const opening = useRef(false);
  blockedRef.current = isBlocked;

  useEffect(() => {
    if (modal.isOpen) opening.current = false;
    if (isBlocked || opening.current) return;
    const next = queue.current.shift();
    if (!next) return;
    opening.current = true;
    modal.openModal(next);
  }, [isBlocked, modal]);

  return {
    ...modal,
    openModal: (config) => {
      if (blockedRef.current || opening.current) {
        queue.current.push(config);
        return;
      }
      opening.current = true;
      modal.openModal(config);
    },
  };
};
