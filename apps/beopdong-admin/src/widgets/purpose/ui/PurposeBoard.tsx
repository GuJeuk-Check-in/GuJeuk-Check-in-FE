import { useState } from 'react';
import styled from '@emotion/styled';
import { Modal } from '@center/ui/modal';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { FailureModal } from '@shared/ui/FailureModal';
import { SortableBoardShell, SortableTile } from '@center/ui/sortable-board';
import { usePurposeManagement } from '@features/purpose/manage-purpose';
import { PurposeCard, usePurposeList } from '@entities/purpose';
import { PurposeAddBox, PurposeAddModal } from '@features/purpose/create-purpose';

export const PurposeBoard = () => {
  const { data: purposes, isLoading, isLoadingError, isRefetchError, refetch, error } = usePurposeList();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { items, sensors, handleDragEnd, announcement, isReordering, isDeleting, modal, failureModal, confirmModal, handleCreate, handleUpdate, handleDelete } =
    usePurposeManagement(purposes);

  return (
    <>
      <HiddenTitle id="admin-page-title" tabIndex={-1}>이용대장 관리</HiddenTitle>
      {isRefetchError && (
        <StaleNotice role="alert">
          목록을 새로 불러오지 못해 최신 상태가 아닐 수 있습니다.
          <RetryButton type="button" onClick={() => void refetch()}>다시 조회</RetryButton>
        </StaleNotice>
      )}
      <Board
        isLoading={isLoading}
        isError={isLoadingError}
        error={error}
        onRetry={() => void refetch()}
        items={items.map((item) => item.id)}
        sensors={sensors}
        onDragEnd={handleDragEnd}
        touchAction="pan-y"
        leadingSlot={<PurposeAddBox onClick={() => setIsAddOpen(true)} />}
      >
        {items.map((purpose) => (
          <SortableTile
            key={purpose.id}
            id={purpose.id}
            label={`${purpose.purpose} 순서 변경`}
            disabled={isReordering || modal.isOpen || failureModal.isOpen || confirmModal.isOpen}
          >
            <PurposeCard
              purpose={purpose}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              isDeleting={isDeleting}
            />
          </SortableTile>
        ))}
      </Board>
      {isAddOpen && (
        <PurposeAddModal
          onClose={() => setIsAddOpen(false)}
          onSubmit={(label) => {
            if (handleCreate(label)) setIsAddOpen(false);
          }}
        />
      )}
      <HiddenStatus role="status" aria-live="polite">{announcement}</HiddenStatus>
      <Modal isOpen={modal.isOpen} config={modal.config} onClose={modal.closeModal} />
      <FailureModal isOpen={failureModal.isOpen} config={failureModal.config} onClose={failureModal.closeModal} />
      <ConfirmModal isOpen={confirmModal.isOpen} config={confirmModal.config} onClose={confirmModal.closeModal} />
    </>
  );
};

const Board = styled(SortableBoardShell)`
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: 62rem) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 40rem) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const StaleNotice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  color: #d32f2f;
`;

const RetryButton = styled.button`
  padding: 0.25rem 0.75rem;
  border: 1px solid currentColor;
  border-radius: 0.5rem;
  background: transparent;
  color: inherit;
  cursor: pointer;
`;

const HiddenTitle = styled.h1`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`;

const HiddenStatus = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
`;
