import { useState } from 'react';
import type { ModalConfig, UseModalReturn } from './types';

export const useModal = (): UseModalReturn => {
  const [config, setConfig] = useState<ModalConfig | null>(null);

  const openModal = (modalConfig: ModalConfig) => {
    setConfig(modalConfig);
  };

  const closeModal = () => {
    setConfig(null);
  };

  return { isOpen: config !== null, config, openModal, closeModal };
};
