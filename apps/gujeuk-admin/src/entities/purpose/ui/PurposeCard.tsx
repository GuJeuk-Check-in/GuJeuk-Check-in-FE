import {
  TileContainer as Container,
  TileDeleteIcon as DeleteIcon,
  TileLabel as Label,
  TileEditInput as EditInput,
  TileStyledEditIcon as StyledEditIcon,
  stopTileDrag,
  useInlineEdit,
} from '@center/ui/card';
import styled from '@emotion/styled';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const ReservationEditButton = styled.button`
  position: absolute;
  top: 0.625rem;
  left: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: none;
  color: #666;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

interface Purpose {
  id: number;
  purpose: string;
}

interface PurposeProps {
  purpose: Purpose;
  index: number;
  onDelete: (id: number) => void;
  onEditReservation: (id: number) => void;
  onUpdate: (params: { id: number; newPurpose: string }) => void;
  isDeleting: boolean;
}

export const PurposeCard = ({
  index,
  purpose,
  onDelete,
  onEditReservation,
  onUpdate,
  isDeleting,
}: PurposeProps) => {
  const edit = useInlineEdit({
    value: purpose.purpose,
    onSubmit: (newPurpose) => onUpdate({ id: purpose.id, newPurpose }),
    disabled: isDeleting,
  });

  return (
    <Container isDisabled={isDeleting}>
      {!edit.isEditing && (
        <ReservationEditButton
          type="button"
          aria-label="예약 필요 여부 수정"
          title="예약 필요 여부 수정"
          onClick={() => onEditReservation(purpose.id)}
          onPointerDown={stopTileDrag}
          onMouseDown={stopTileDrag}
          disabled={isDeleting}
        >
          <FaRegCalendarCheck size={18} />
        </ReservationEditButton>
      )}
      <DeleteIcon
        type="button"
        onClick={() => onDelete(purpose.id)}
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        isDeleting={isDeleting}
        disabled={isDeleting}
      >
        {isDeleting ? (
          '...'
        ) : (
          <IoClose size="1.25rem" style={{ pointerEvents: 'none' }} />
        )}
      </DeleteIcon>

      {edit.isEditing ? (
        <EditInput
          type="text"
          {...edit.inputProps}
        />
      ) : (
        <Label>
          {index}. {purpose.purpose}
          <StyledEditIcon
            size={18}
            onClick={edit.start}
            onPointerDown={stopTileDrag}
            onMouseDown={stopTileDrag}
            isDeleting={isDeleting}
          />
        </Label>
      )}
    </Container>
  );
};
