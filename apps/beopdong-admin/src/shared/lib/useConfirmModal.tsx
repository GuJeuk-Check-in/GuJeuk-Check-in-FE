import type { ReactNode } from 'react';
import { useTheme } from '@emotion/react';
import { adminTokens } from '@center/tokens';
import { useModal } from '@center/ui/modal';
import { LuTrash2 } from 'react-icons/lu';

interface ConfirmOptions {
  readonly icon?: ReactNode;
  readonly title: string;
  readonly subtitle: string;
  readonly onConfirm: () => void;
  readonly showCancel?: boolean;
  readonly confirmLabel?: string;
}

export const useConfirmModal = () => {
  const confirmModal = useModal();
  const { colors } = adminTokens(useTheme());

  const openConfirm = ({ icon = <LuTrash2 />, title, subtitle, onConfirm, showCancel = true, confirmLabel = '예' }: ConfirmOptions) => {
    confirmModal.openModal({
      icon,
      title,
      subtitle,
      theme: 'warning',
      buttons: [
        ...(showCancel ? [{ label: '아니요', variant: 'secondary' as const, onClick: confirmModal.closeModal }] : []),
        {
          label: confirmLabel,
          variant: 'primary',
          bgColor: colors.error,
          onClick: () => {
            confirmModal.closeModal();
            onConfirm();
          },
        },
      ],
    });
  };

  return { confirmModal, openConfirm };
};
