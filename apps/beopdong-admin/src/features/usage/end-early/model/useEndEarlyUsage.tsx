import { useModal } from '@center/ui/modal';
import { openApiPendingNotice } from '@shared/lib/openApiPendingNotice';
import { useConfirmModal } from '@shared/lib/useConfirmModal';
import type { UsageRecord } from '@entities/usage';

export const useEndEarlyUsage = () => {
  const modal = useModal();
  const { confirmModal, openConfirm } = useConfirmModal();

  const handleEndEarly = (record: UsageRecord) => {
    openConfirm({
      title: '이 이용대장을 조기 종료할까요?',
      subtitle: `${record.name} · ${record.purposeName} · ${record.detail}`,
      onConfirm: () => openApiPendingNotice(modal, '조기 종료', '현재 이용대장은 종료되지 않았습니다.'),
    });
  };

  return { modal, confirmModal, handleEndEarly };
};
