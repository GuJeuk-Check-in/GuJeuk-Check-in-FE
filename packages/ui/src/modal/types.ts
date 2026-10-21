import type { ReactNode } from 'react';

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

export interface UseModalReturn {
  isOpen: boolean;
  config: ModalConfig | null;
  openModal: (modalConfig: ModalConfig) => void;
  closeModal: () => void;
}
