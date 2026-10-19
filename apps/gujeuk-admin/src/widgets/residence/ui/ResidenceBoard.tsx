import { useResidenceList, ResidenceCard } from '@entities/residence';
import { CreateResidenceModal } from '@features/residence/create-residence';
import {
  useUpdateResidenceHandler,
  useDeleteResidenceHandler,
  useReorderResidence,
} from '@features/residence';
import { SortablePurposeItem } from '@entities/purpose';
import { Modal } from '@shared/ui/modal/Modal';
import { useModal } from '@shared/hooks/useModal';
import { SortableBoardShell } from '@widgets/sortable-board';
import type { ResidenceResponse } from '@entities/residence';

const EMPTY_RESIDENCES: ResidenceResponse[] = [];

export const ResidenceBoard = () => {
  const { data: residences, isLoading, isError, error } = useResidenceList();
  const { items, sensors, handleDragEnd } = useReorderResidence(
    residences ?? EMPTY_RESIDENCES
  );
  const { isOpen, config, openModal, closeModal } = useModal();

  const { handleUpdate, updatingId } = useUpdateResidenceHandler({
    modal: { isOpen, config, openModal, closeModal },
  });

  const { handleDelete, deletingId } = useDeleteResidenceHandler({
    modal: { isOpen, config, openModal, closeModal },
  });

  return (
    <>
      <SortableBoardShell
        isLoading={isLoading}
        isError={isError}
        error={error}
        items={items}
        sensors={sensors}
        onDragEnd={handleDragEnd}
        trailingSlot={<CreateResidenceModal />}
      >
        {items.map((residence, index) => (
          <SortablePurposeItem key={residence.id} id={residence.id}>
            <ResidenceCard
              index={index + 1}
              residence={residence}
              onDelete={handleDelete}
              onUpdate={({
                id,
                newResidence,
              }: {
                id: number;
                newResidence: string;
              }) => handleUpdate(id, newResidence)}
              isDeleting={
                deletingId === residence.id || updatingId === residence.id
              }
            />
          </SortablePurposeItem>
        ))}
      </SortableBoardShell>
      {isOpen && config && (
        <Modal isOpen={isOpen} config={config} onClose={closeModal} />
      )}
    </>
  );
};
