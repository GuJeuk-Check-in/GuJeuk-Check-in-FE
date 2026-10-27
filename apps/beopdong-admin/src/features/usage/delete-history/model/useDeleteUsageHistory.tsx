import { useTheme } from '@emotion/react';
import { adminTokens } from '@center/tokens';
import { useModal } from '@center/ui/modal';
import { IoWarningOutline } from 'react-icons/io5';
import type { UsageHistoryDetail } from '@entities/usage';

export const useDeleteUsageHistory = () => {
  const modal = useModal();
  const { colors } = adminTokens(useTheme());

  const handleDelete = (detail: Pick<UsageHistoryDetail, 'name'>) => {
    modal.openModal({
      icon: <IoWarningOutline />,
      title: `정말 ${detail.name}님의 이용 기록을 삭제하시겠나요?`,
      subtitle: '삭제된 기록은 복구할 수 없습니다.',
      theme: 'warning',
      buttons: [
        { label: '아니요', onClick: modal.closeModal },
        {
          label: '네, 삭제합니다',
          variant: 'primary',
          bgColor: colors.error,
          onClick: () => modal.openModal({
            title: '삭제 API 연결 전입니다.',
            subtitle: '현재 기록은 삭제되지 않았습니다.',
            buttons: [{ label: '확인', onClick: modal.closeModal }],
          }),
        },
      ],
    });
  };

  return { modal, handleDelete };
};
