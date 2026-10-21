import { useState } from 'react';
import type { ModalConfig, UseModalReturn } from '@center/ui/modal';
export type { ButtonConfig, ModalConfig, UseModalReturn } from '@center/ui/modal';

export const useModal = (): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ModalConfig | null>(null);

  const openModal = (modalConfig: ModalConfig) => {
    setConfig(modalConfig);
    setTimeout(() => {
      setIsOpen(true);
    }, 0);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setConfig(null);
    }, 300);
  };

  return { isOpen, config, openModal, closeModal };
};
