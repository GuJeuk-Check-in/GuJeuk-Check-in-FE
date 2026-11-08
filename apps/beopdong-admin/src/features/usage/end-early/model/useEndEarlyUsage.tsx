import { useTheme } from '@emotion/react';
import { adminTokens } from '@center/tokens';
import { useModal } from '@center/ui/modal';
import { MdDeleteOutline } from 'react-icons/md';
import { openApiPendingNotice } from '@shared/lib/openApiPendingNotice';
import type { UsageRecord } from '@entities/usage';

export const useEndEarlyUsage = () => {
  const modal = useModal();
  const tokens = adminTokens(useTheme());

  const handleEndEarly = (record: UsageRecord) => {
    modal.openModal({
      icon: <MdDeleteOutline size="40px" color={tokens.colors.error} />,
      title: '이 이용대장을 조기 종료할까요?',
      subtitle: `${record.name} · ${record.purposeName} · ${record.detail}`,
      theme: 'warning',
      buttons: [
        { label: '아니요', variant: 'secondary', onClick: modal.closeModal },
        {
          label: '예',
          bgColor: tokens.colors.error,
          variant: 'primary',
          onClick: () => openApiPendingNotice(modal, '조기 종료', '현재 이용대장은 종료되지 않았습니다.'),
        },
      ],
    });
  };

  return { modal, handleEndEarly };
};
