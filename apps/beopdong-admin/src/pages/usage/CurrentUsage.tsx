import { Modal } from '@center/ui/modal';
import { useEndEarlyUsage } from '@features/usage/end-early';
import { CurrentUsageBoard } from '@widgets/usage';
import { previewUsageGroups } from './model/previewUsages';

const CurrentUsage = () => {
  const { modal, handleEndEarly } = useEndEarlyUsage();

  return (
    <>
      <CurrentUsageBoard groups={previewUsageGroups} onEndEarly={handleEndEarly} />
      <Modal isOpen={modal.isOpen} config={modal.config} onClose={modal.closeModal} />
    </>
  );
};

export default CurrentUsage;
