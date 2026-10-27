import { Modal, useModal } from '@center/ui/modal';
import { adminTokens } from '@center/tokens';
import { useTheme } from '@emotion/react';
import type { UsageHistoryRecord } from '@entities/usage';
import { UsageHistoryBoard } from '@widgets/usage';
import { IoWarningOutline } from 'react-icons/io5';
import { previewUsageHistory } from './model/previewUsageHistory';

const UsageHistory = () => {
  const modal = useModal();
  const { colors } = adminTokens(useTheme());

  const handleDelete = (record: UsageHistoryRecord) => {
    modal.openModal({
      icon: <IoWarningOutline />,
      title: `정말 ${record.name}님의 이용 기록을 삭제하시겠나요?`,
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

  return (
    <>
      <UsageHistoryBoard records={previewUsageHistory} onDelete={handleDelete} />
      <Modal isOpen={modal.isOpen} config={modal.config} onClose={modal.closeModal} />
    </>
  );
};

export default UsageHistory;
