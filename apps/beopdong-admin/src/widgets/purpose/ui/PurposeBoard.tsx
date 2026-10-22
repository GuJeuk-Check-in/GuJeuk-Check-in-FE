import styled from '@emotion/styled';
import { Modal } from '@center/ui/modal';
import { SortableBoardShell, SortableTile } from '@center/ui/sortable-board';
import { usePurposeManagement } from '@features/purpose/manage-purpose';
import { PurposeCard, type Purpose } from '@entities/purpose';
import { PurposeAddBox } from '@features/purpose/create-purpose';

interface PurposeBoardProps {
  readonly initialPurposes: readonly Purpose[];
}

export const PurposeBoard = ({ initialPurposes }: PurposeBoardProps) => {
  const { items, sensors, handleDragEnd, announcement, modal, handleCreate, handleUpdate, handleDelete } =
    usePurposeManagement(initialPurposes);

  return (
    <>
      <HiddenTitle id="admin-page-title" tabIndex={-1}>이용대장 관리</HiddenTitle>
      <Board
        isLoading={false}
        isError={false}
        error={null}
        items={items.map((item) => item.id)}
        sensors={sensors}
        onDragEnd={handleDragEnd}
        touchAction="pan-y"
        leadingSlot={<PurposeAddBox onSubmit={handleCreate} />}
      >
        {items.map((purpose) => (
          <SortableTile
            key={purpose.id}
            id={purpose.id}
            label={`${purpose.purpose} 순서 변경`}
            disabled={modal.isOpen}
          >
            <PurposeCard
              purpose={purpose}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </SortableTile>
        ))}
      </Board>
      <HiddenStatus role="status" aria-live="polite">{announcement}</HiddenStatus>
      <Modal isOpen={modal.isOpen} config={modal.config} onClose={modal.closeModal} />
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
