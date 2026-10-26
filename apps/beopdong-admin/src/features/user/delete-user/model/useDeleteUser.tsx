import { useTheme } from '@emotion/react';
import { adminTokens } from '@center/tokens';
import { useModal } from '@center/ui/modal';
import { IoWarningOutline } from 'react-icons/io5';
import type { UserDetail } from '@entities/user';

export const useDeleteUser = () => {
  const modal = useModal();
  const { colors } = adminTokens(useTheme());

  const handleDelete = (user: Pick<UserDetail, 'name'>) => {
    modal.openModal({
      icon: <IoWarningOutline />,
      title: `정말 ${user.name}님을 삭제하시겠나요?`,
      subtitle: '삭제된 회원은 복구할 수 없습니다.',
      theme: 'warning',
      buttons: [
        { label: '아니요', onClick: modal.closeModal },
        {
          label: '네, 삭제합니다',
          variant: 'primary',
          bgColor: colors.error,
          onClick: () => modal.openModal({
            title: '삭제 API 연결 전입니다.',
            subtitle: '현재 회원은 삭제되지 않았습니다.',
            buttons: [{ label: '확인', onClick: modal.closeModal }],
          }),
        },
      ],
    });
  };

  return { modal, handleDelete };
};
