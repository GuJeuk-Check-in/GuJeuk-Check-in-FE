import { useRef, useState } from 'react';
import { useModal } from '@center/ui/modal';
import { isAxiosError } from 'axios';
import { LuCircleAlert } from 'react-icons/lu';
import { isNotFoundError } from './isNotFoundError';
import { openApiPendingNotice } from './openApiPendingNotice';
import { useConfirmModal } from './useConfirmModal';

interface DeleteTarget {
  readonly name: string | null;
}

interface ConfirmDeleteMessages<T extends DeleteTarget> {
  readonly title: string | ((name: string) => string);
  readonly subtitle: string | ((target: T) => string);
  readonly pendingSubtitle: string;
}

interface ConfirmDeleteOptions<T extends DeleteTarget> {
  readonly onDelete?: (target: T) => Promise<void>;
  readonly failureMessage?: string;
  readonly alreadyDeleted?: { readonly title: string; readonly subtitle: string; readonly confirmLabel: string; readonly onConfirm: () => void };
}

export const useConfirmDelete = <T extends DeleteTarget = DeleteTarget>(
  { title, subtitle, pendingSubtitle }: ConfirmDeleteMessages<T>,
  { onDelete, failureMessage = '삭제하지 못했습니다. 잠시 후 다시 시도해주세요.', alreadyDeleted }: ConfirmDeleteOptions<T> = {},
) => {
  const modal = useModal();
  const { confirmModal, openConfirm } = useConfirmModal();
  const [isDeleting, setIsDeleting] = useState(false);
  const inFlight = useRef(false);

  const runDelete = async (target: T) => {
    if (!onDelete) {
      openApiPendingNotice(modal, '삭제', pendingSubtitle);
      return;
    }
    inFlight.current = true;
    setIsDeleting(true);
    try {
      await onDelete(target);
    } catch (error) {
      if (alreadyDeleted && isNotFoundError(error)) {
        openConfirm({ icon: <LuCircleAlert />, showCancel: false, ...alreadyDeleted });
        return;
      }
      modal.openModal({
        title: '삭제에 실패했습니다.',
        subtitle: (isAxiosError<{ message?: string }>(error) && error.response?.data?.message) || failureMessage,
        buttons: [{ label: '확인', onClick: modal.closeModal }],
      });
    } finally {
      inFlight.current = false;
      setIsDeleting(false);
    }
  };

  const handleDelete = (target: T) => {
    if (inFlight.current) return;
    openConfirm({
      title: typeof title === 'function' ? title(target.name ?? '') : title,
      subtitle: typeof subtitle === 'function' ? subtitle(target) : subtitle,
      onConfirm: () => void runDelete(target),
    });
  };

  return { modal, confirmModal, isDeleting, handleDelete };
};
