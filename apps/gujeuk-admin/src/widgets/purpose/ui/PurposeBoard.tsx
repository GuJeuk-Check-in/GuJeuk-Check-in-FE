import {
  usePurposeList,
  PurposeCard,
  PurposeFormModal,
  SortablePurposeItem,
} from '@entities/purpose/index';
import {
  useUpdatePurposeHandler,
  useDeletePurposeHandler,
  useReorderPurpose,
  PurposeAddBox,
} from '@features/purpose/index';

import styled from '@emotion/styled';
import { Modal } from '@shared/ui/modal/Modal';
import { SortableBoardShell } from '@widgets/sortable-board';

export const PurposeBoard = () => {
  const {
    data: purposes,
    isLoading: isListLoading,
    isError,
    error,
  } = usePurposeList();
  const { items, sensors, handleDragEnd, modal: reorderModal } = useReorderPurpose(purposes);
  const {
    editingPurpose,
    startEdit,
    cancelEdit,
    handleUpdate,
    isLoading: isUpdating,
    isOpen: isUpdateOpen,
    config: updateConfig,
  } = useUpdatePurposeHandler();
  const { handleDelete, deletingId, isOpen, config } =
    useDeletePurposeHandler();

  return (
    <Board
      isLoading={isListLoading}
      isError={isError}
      error={error}
      items={items}
      sensors={sensors}
      onDragEnd={handleDragEnd}
      leadingSlot={<PurposeAddBox />}
      afterGridSlot={
        <>
          {editingPurpose && (
            <PurposeFormModal
              key={editingPurpose.id}
              mode="update"
              initialValues={editingPurpose}
              isSubmitting={isUpdating}
              onClose={cancelEdit}
              onSubmit={handleUpdate}
            />
          )}
          {isOpen && config && <Modal isOpen={isOpen} config={config} />}
          {isUpdateOpen && updateConfig && (
            <Modal isOpen={isUpdateOpen} config={updateConfig} />
          )}
          <Modal isOpen={reorderModal.isOpen} config={reorderModal.config} onClose={reorderModal.closeModal} />
        </>
      }
    >
      {items.map((purpose, index) => (
        <SortablePurposeItem key={purpose.id} id={Number(purpose.id)}>
          <PurposeCard
            index={index + 1}
            purpose={purpose}
            onDelete={handleDelete}
            onEdit={startEdit}
            isDeleting={deletingId === purpose.id || isUpdating}
          />
        </SortablePurposeItem>
      ))}
    </Board>
  );
};

const Board = styled(SortableBoardShell)`
  max-width: 80.3125rem;
  grid-auto-rows: 10rem;
  overflow: visible;
`;
