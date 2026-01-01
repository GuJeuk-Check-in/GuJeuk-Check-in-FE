import { useState, ReactNode } from 'react';

export interface ButtonConfig {
  label: string;
  variant?: 'primary' | 'secondary';
  bgColor?: string;
  onClick?: () => void;
}

export interface ModalConfig {
  icon?: ReactNode;
  title: string;
  subtitle: string;
  buttons?: ButtonConfig[];
  theme?: 'default' | 'warning' | 'info';
}

interface UseModalReturn {
  isOpen: boolean;
  config: ModalConfig | null;
  openModal: (modalConfig: ModalConfig) => void;
  closeModal: () => void;
}

export const useModal = (): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ModalConfig | null>(null);

  const openModal = (modalConfig: ModalConfig) => {
    setConfig(modalConfig);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setConfig(null);
  };

  return { isOpen, config, openModal, closeModal };
};
