import { useEffect, useRef } from 'react';
import { LuCircleAlert } from 'react-icons/lu';
import { isNotFoundError } from './isNotFoundError';
import { useConfirmModal } from './useConfirmModal';

interface NotFoundNotice {
  readonly title: string;
  readonly subtitle: string;
  readonly confirmLabel: string;
  readonly onConfirm: () => void;
}

interface LoadFailureModalOptions {
  readonly title: string;
  readonly isError: boolean;
  readonly error?: unknown;
  readonly failedAt: number;
  readonly onRetry: () => void;
  readonly notFound?: NotFoundNotice;
}

const SUBTITLE = '연결을 확인한 뒤 다시 시도해주세요.';

export const useLoadFailureModal = ({ title, isError, error, failedAt, onRetry, notFound }: LoadFailureModalOptions) => {
  const { confirmModal, openConfirm } = useConfirmModal();
  const latest = useRef({ title, error, onRetry, notFound, openConfirm });
  latest.current = { title, error, onRetry, notFound, openConfirm };

  useEffect(() => {
    if (!isError) return;
    const current = latest.current;
    if (current.notFound && isNotFoundError(current.error)) {
      current.openConfirm({ icon: <LuCircleAlert />, showCancel: false, ...current.notFound });
      return;
    }
    current.openConfirm({
      icon: <LuCircleAlert />,
      title: current.title,
      subtitle: SUBTITLE,
      showCancel: false,
      onConfirm: current.onRetry,
    });
  }, [isError, failedAt]);

  return confirmModal;
};
