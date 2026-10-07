import {
  usePurposeList,
  PurposeCard,
  SortablePurposeItem,
} from '@entities/purpose/index';
import {
  useUpdatePurposeHandler,
  useDeletePurposeHandler,
  useReorderPurpose,
  PurposeAddBox,
} from '@features/purpose/index';

import { Modal } from '@shared/ui/modal/Modal';
import { SortableBoardShell } from '@widgets/sortable-board';

export const PurposeBoard = () => {
  const {
    data: purposes,
    isLoading: isListLoading,
    isError,
    error,
  } = usePurposeList();
  const { items, sensors, handleDragEnd } = useReorderPurpose(
    purposes || []
  );
  const {
    handleUpdate,
    isLoading: isUpdating,
    isOpen: isUpdateOpen,
    config: updateConfig,
  } = useUpdatePurposeHandler();
  const { handleDelete, deletingId, isOpen, config } =
    useDeletePurposeHandler();

  return (
    <SortableBoardShell
      isLoading={isListLoading}
      isError={isError}
      error={error}
      items={items}
      sensors={sensors}
      onDragEnd={handleDragEnd}
      trailingSlot={<PurposeAddBox />}
      afterGridSlot={
        <>
          {isOpen && config && <Modal isOpen={isOpen} config={config} />}
          {isUpdateOpen && updateConfig && (
            <Modal isOpen={isUpdateOpen} config={updateConfig} />
          )}
        </>
      }
    >
      {items.map((purpose, index) => (
        <SortablePurposeItem key={purpose.id} id={Number(purpose.id)}>
          <PurposeCard
            index={index + 1}
            purpose={purpose}
            onDelete={handleDelete}
            onUpdate={({
              id,
              newPurpose,
            }: {
              id: number;
              newPurpose: string;
            }) => handleUpdate(id, newPurpose)}
            isDeleting={deletingId === purpose.id || isUpdating}
          />
        </SortablePurposeItem>
      ))}
    </SortableBoardShell>
  );
};
