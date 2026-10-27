import { Modal } from '@center/ui/modal';
import { useEndEarlyUsage } from '@features/usage/end-early';
import { CurrentUsageBoard } from '@widgets/usage';
import { toUsageGroups } from '@entities/usage';
import { previewUsageStatus } from './model/previewUsageStatus';

const CurrentUsage = () => {
  const { modal, handleEndEarly } = useEndEarlyUsage();

  return (
    <>
      <CurrentUsageBoard groups={toUsageGroups(previewUsageStatus.usageStatus)} onEndEarly={handleEndEarly} />
      <Modal isOpen={modal.isOpen} config={modal.config} onClose={modal.closeModal} />
    </>
  );
};

export default CurrentUsage;
