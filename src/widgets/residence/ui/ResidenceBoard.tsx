import styled from '@emotion/styled';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { useResidenceList } from '@entities/residence/index';
import { ResidenceCard } from '@entities/residence/index';
import { CreateResidenceModal } from '@features/residence/create-residence';
import {
  useUpdateResidenceHandler,
  useDeleteResidenceHandler,
  useReorderResidence,
} from '@features/residence/index';
import { SortablePurposeItem } from '@shared/ui/Form/SortablePurposeItem';
import { Modal } from '@shared/ui/modal/Modal';
import { useModal } from '@shared/hooks/useModal';

export const ResidenceBoard = () => {
  const { data: residences, isLoading, isError, error } = useResidenceList();
  const { items, sensors, handleDragEnd } = useReorderResidence(
    residences || []
  );
  const { isOpen, config, openModal, closeModal } = useModal();

  const { handleUpdate, isLoading: updatingId } = useUpdateResidenceHandler({
    modal: { isOpen, config, openModal, closeModal },
  });

  const { handleDelete, deletingId } = useDeleteResidenceHandler({
    modal: { isOpen, config, openModal, closeModal },
  });

  if (isLoading) {
    return (
      <LoadingOverlay>
        <LoadingBox>
          <p>데이터를 불러오는 중</p>
          <p>잠시만 기다려주세요...</p>
        </LoadingBox>
      </LoadingOverlay>
    );
  }

  if (isError) {
    return (
      <ErrorText>
        데이터 로드 실패: {error instanceof Error ? error.message : '오류 발생'}
      </ErrorText>
    );
  }

  return (
    <Container>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <ResidenceListGrid>
          <SortableContext items={items} strategy={rectSortingStrategy}>
            {items.map((residence) => (
              <SortablePurposeItem key={residence.id} id={residence.id}>
                <ResidenceCard
                  residence={residence}
                  onDelete={handleDelete}
                  onUpdate={({
                    id,
                    newResidence,
                  }: {
                    id: number;
                    newResidence: string;
                  }) => handleUpdate(id, newResidence)}
                  isDeleting={deletingId === residence.id}
                />
              </SortablePurposeItem>
            ))}
          </SortableContext>
          <CreateResidenceModal />
        </ResidenceListGrid>
      </DndContext>
      {isOpen && config && (
        <Modal isOpen={isOpen} config={config} onClose={closeModal} />
      )}
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const ResidenceListGrid = styled.div`
  width: 100%;
  height: 100%;
  max-width: 75rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 9rem;
  gap: 1.5rem;
  justify-items: center;
  padding: 2.5rem 7.5rem;
`;

const ErrorText = styled.div`
  text-align: center;
  color: red;
  margin-top: 2rem;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoadingBox = styled.div`
  background: rgba(255, 255, 255, 0.3);
  padding: 30px 50px;
  border-radius: 10px;
  color: #fff;
`;
