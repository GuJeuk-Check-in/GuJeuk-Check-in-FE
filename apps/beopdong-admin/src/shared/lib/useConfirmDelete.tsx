import { useModal } from '@center/ui/modal';
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

export const useConfirmDelete = <T extends DeleteTarget = DeleteTarget>({
  title,
  subtitle,
  pendingSubtitle,
}: ConfirmDeleteMessages<T>) => {
  const modal = useModal();
  const { confirmModal, openConfirm } = useConfirmModal();

  const handleDelete = (target: T) => {
    openConfirm({
      title: typeof title === 'function' ? title(target.name ?? '') : title,
      subtitle: typeof subtitle === 'function' ? subtitle(target) : subtitle,
      onConfirm: () => openApiPendingNotice(modal, '삭제', pendingSubtitle),
    });
  };

  return { modal, confirmModal, handleDelete };
};
