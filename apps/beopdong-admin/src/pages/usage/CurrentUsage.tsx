import { Modal } from '@center/ui/modal';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { useEndEarlyUsage } from '@features/usage/end-early';
import { CurrentUsageBoard } from '@widgets/usage';
import { toUsageGroups } from '@entities/usage';
import { previewUsageStatus } from './model/previewUsageStatus';

const CurrentUsage = () => {
  const { modal, confirmModal, handleEndEarly } = useEndEarlyUsage();

  return (
    <>
      <CurrentUsageBoard groups={toUsageGroups(previewUsageStatus.usageStatus)} onEndEarly={handleEndEarly} />
      <Modal isOpen={modal.isOpen} config={modal.config} onClose={modal.closeModal} />
      <ConfirmModal isOpen={confirmModal.isOpen} config={confirmModal.config} onClose={confirmModal.closeModal} />
    </>
  );
};

export default CurrentUsage;
