import { Modal } from '@center/ui/modal';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { useDeleteUsageHistory } from '@features/usage/delete-history';
import { UsageHistoryBoard } from '@widgets/usage';
import { previewUsageHistory } from './model/previewUsageHistory';

const UsageHistory = () => {
  const { modal, confirmModal, handleDelete } = useDeleteUsageHistory();

  return (
    <>
      <UsageHistoryBoard records={previewUsageHistory} onDelete={handleDelete} />
      <Modal isOpen={modal.isOpen} config={modal.config} onClose={modal.closeModal} />
      <ConfirmModal isOpen={confirmModal.isOpen} config={confirmModal.config} onClose={confirmModal.closeModal} />
    </>
  );
};

export default UsageHistory;
