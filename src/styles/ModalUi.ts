import { FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

type ModalType = 'SUCCESS' | 'ERROR' | 'WARNING' | 'CONFIRM';

interface ModalState {
  type: ModalType;
  title: string;
  subtitle: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const MODAL_UI = {
  SUCCESS: {
    icon: FaCheckCircle,
    color: '#0F50A0',
    theme: 'info',
  },
  ERROR: {
    icon: FaExclamationTriangle,
    color: '#D88282',
    theme: 'warning',
  },
  CONFIRM: {
    icon: FaExclamationTriangle,
    color: '#D88282',
    theme: 'warning',
  },
} as const;
