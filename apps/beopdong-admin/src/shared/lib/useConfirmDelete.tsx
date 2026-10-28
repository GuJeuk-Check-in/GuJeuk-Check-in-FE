import { useTheme } from '@emotion/react';
import { adminTokens } from '@center/tokens';
import { useModal } from '@center/ui/modal';
import { IoWarningOutline } from 'react-icons/io5';
import { openApiPendingNotice } from './openApiPendingNotice';

interface ConfirmDeleteMessages {
  readonly title: (name: string) => string;
  readonly subtitle: string;
  readonly pendingSubtitle: string;
}

interface DeleteTarget {
  readonly name: string;
}

export const useConfirmDelete = ({ title, subtitle, pendingSubtitle }: ConfirmDeleteMessages) => {
  const modal = useModal();
  const { colors } = adminTokens(useTheme());

  const handleDelete = (target: DeleteTarget) => {
    modal.openModal({
      icon: <IoWarningOutline />,
      title: title(target.name),
      subtitle,
      theme: 'warning',
      buttons: [
        { label: '아니요', onClick: modal.closeModal },
        {
          label: '네, 삭제합니다',
          variant: 'primary',
          bgColor: colors.error,
          onClick: () => openApiPendingNotice(modal, '삭제', pendingSubtitle),
        },
      ],
    });
  };

  return { modal, handleDelete };
};
