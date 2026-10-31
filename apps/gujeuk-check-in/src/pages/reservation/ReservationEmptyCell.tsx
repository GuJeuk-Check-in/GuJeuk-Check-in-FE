import styled from "@emotion/styled";
import { PlusButton } from "@shared/assets";
import { ColorData } from "@shared/ui/design-system";
import type { ReservationPlace, ReservationTime } from './ReservationData';

interface ReservationEmptyCellProps {
  place: ReservationPlace;
  time: ReservationTime;
  column: number;
  row: number;
  onAddClick: (place: ReservationPlace, time: ReservationTime) => void;
}

export const ReservationEmptyCell = ({
  place,
  time,
  column,
  row,
  onAddClick,
}: ReservationEmptyCellProps) => (
  <Cell $column={column} $row={row}>
    <AddButton
      type="button"
      className="reservation-add-button"
      onClick={() => onAddClick(place, time)}
      aria-label={`${place} ${time} 예약 추가`}
    >
      <img src={PlusButton} alt="" />
      <span>예약 추가</span>
    </AddButton>
  </Cell>
);

const Cell = styled.div<{ $column: number; $row: number }>`
  grid-column: ${({ $column }) => $column};
  grid-row: ${({ $row }) => $row};
  position: relative;
  min-height: 3.5rem;

  &:hover {
    z-index: 3;
  }

  &:hover .reservation-add-button {
    opacity: 1;
  }
`;

const AddButton = styled.button`
  position: absolute;
  inset: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${ColorData.spacing[4]};
  padding: ${ColorData.spacing[4]};
  box-sizing: border-box;
  opacity: 0;
  border: 1px dashed ${ColorData.colors.primary};
  background-color: ${ColorData.colors.primary8};
  color: ${ColorData.colors.primary};
  font-size: ${ColorData.typography.caption.fontSize};

  cursor: pointer;
  transition:
    background-color 0.2s ease,
    opacity 0.2s ease;

  &:focus-visible {
    opacity: 1;
  }

  &:hover {
    background-color: ${ColorData.colors.primaryLight};
  }
`;
