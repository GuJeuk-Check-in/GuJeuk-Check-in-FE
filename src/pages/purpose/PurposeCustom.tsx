import { PageLayout } from '@widgets/GlobalLayout';
import { PurposeBoard } from '@widgets/purpose/ui/PurposeBoard';
import { Modal } from '@shared/ui';
import { useModal } from '@shared/hooks/useModal';

const PurposeCustom = () => {
  const { isOpen, config, closeModal } = useModal();

  return (
    <>
      <PageLayout showHeader={true}>
        <PurposeBoard />
      </PageLayout>
      <Modal isOpen={isOpen} config={config} onClose={closeModal} />
    </>
  );
};

export default PurposeCustom;
