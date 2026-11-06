import {
  TileContainer as Container,
  TileDeleteIcon as DeleteIcon,
  TileLabel as Label,
  TileEditInput as EditInput,
  TileStyledEditIcon as StyledEditIcon,
  stopTileDrag,
  useInlineEdit,
} from "@center/ui/card";
import styled from "@emotion/styled";
import type { PurposeResponse } from "../model/types";
import { IoClose } from "react-icons/io5";

const ReservationStatusButton = styled.button<{ $isReservable: boolean }>`
  position: absolute;
  top: 0.625rem;
  left: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 0.4rem;
  border: none;
  border-radius: 0.25rem;
  background: ${({ $isReservable }) => ($isReservable ? "#e6f0ff" : "#f1f1f1")};
  color: ${({ $isReservable }) => ($isReservable ? "#2866ad" : "#777")};
  font-size: 0.625rem;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

interface PurposeProps {
  purpose: PurposeResponse;
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
        <ReservationStatusButton
          type="button"
          aria-label={`예약 필요 여부 수정: 현재 ${purpose.reservationStatus ? "예약 가능" : "예약 불가"}`}
          title="예약 필요 여부 수정"
          $isReservable={purpose.reservationStatus}
          onClick={() => onEditReservation(purpose.id)}
          onPointerDown={stopTileDrag}
          onMouseDown={stopTileDrag}
          onKeyDown={stopTileDrag}
          disabled={isDeleting}
        >
          {purpose.reservationStatus ? "예약 가능" : "예약 불가"}
        </ReservationStatusButton>
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
          "..."
        ) : (
          <IoClose size="1.25rem" style={{ pointerEvents: "none" }} />
        )}
      </DeleteIcon>

      {edit.isEditing ? (
        <EditInput type="text" {...edit.inputProps} />
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
