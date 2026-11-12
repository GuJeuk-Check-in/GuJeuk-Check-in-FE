import styled from "@emotion/styled";
import { FiPlus } from "react-icons/fi";
import { ColorData } from "@center/tokens";
import type { ReservationPlace, ReservationTime } from './ReservationData';
import { ReservationColors } from "./reservationColors";

interface ReservationEmptyCellProps {
  place: ReservationPlace;
  time: ReservationTime;
  column: number;
  row: number;
  selected?: boolean;
  onAddClick: (place: ReservationPlace, time: ReservationTime) => void;
}

export const ReservationEmptyCell = ({
  place,
  time,
  column,
  row,
  selected = false,
  onAddClick,
}: ReservationEmptyCellProps) => (
  <Cell $column={column} $row={row}>
    <AddButton
      type="button"
      className="reservation-add-button"
      onClick={() => onAddClick(place, time)}
      aria-label={`${place} ${time} 예약 추가`}
      $selected={selected}
    >
      <FiPlus aria-hidden="true" />
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

const AddButton = styled.button<{ $selected: boolean }>`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: ${ColorData.spacing[4]};
  box-sizing: border-box;
  opacity: ${({ $selected }) => ($selected ? 1 : 0)};
  border: 0.09375rem dashed ${ReservationColors.skyblue};
  background-color: transparent;
  color: ${ReservationColors.blue};
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: -0.025rem;
  line-height: 1.5rem;
  cursor: pointer;
  transition: opacity 0.2s ease;

  svg {
    flex: 0 0 auto;
    width: 1rem;
    height: 1rem;
    color: ${ReservationColors.skyblue};
  }

  &:focus-visible {
    opacity: 1;
    outline: none;
  }
`;
