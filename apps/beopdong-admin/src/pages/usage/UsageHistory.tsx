import { Modal } from '@center/ui/modal';
import { useDeleteUsageHistory } from '@features/usage/delete-history';
import { UsageHistoryBoard } from '@widgets/usage';
import { previewUsageHistory } from './model/previewUsageHistory';

const UsageHistory = () => {
  const { modal, handleDelete } = useDeleteUsageHistory();

  return (
    <>
      <UsageHistoryBoard records={previewUsageHistory} onDelete={handleDelete} />
      <Modal isOpen={modal.isOpen} config={modal.config} onClose={modal.closeModal} />
    </>
  );
};

export default UsageHistory;
