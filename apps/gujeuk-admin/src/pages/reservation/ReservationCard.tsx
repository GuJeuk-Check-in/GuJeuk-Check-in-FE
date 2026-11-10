import styled from "@emotion/styled";
import type { MouseEvent } from "react";
import { ColorData } from "@center/tokens";
import { ReservationColors } from "./reservationColors";

interface ReservationCardProps {
  userName: string;
  place: string;
  time: string;
  column: number;
  row: number;
  readOnly?: boolean;
  selected?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const ReservationCard = ({
  userName,
  place,
  time,
  column,
  row,
  readOnly = false,
  selected = false,
  onClick,
}: ReservationCardProps) => {
  return (
    <Card
      as={readOnly ? 'div' : 'button'}
      $column={column}
      $row={row}
      aria-label={`예약자 ${userName}, 장소 ${place}, 시간 ${time}`}
      aria-expanded={readOnly ? undefined : selected}
      data-reservation-card=""
      onClick={onClick}
      type={readOnly ? undefined : 'button'}
      $readOnly={readOnly}
      $selected={selected}
    >
      {userName}
    </Card>
  );
};

const Card = styled.button<{
  $column: number;
  $row: number;
  $readOnly: boolean;
  $selected: boolean;
}>`
  grid-column: ${({ $column }) => $column};
  grid-row: ${({ $row }) => $row};
  z-index: ${({ $selected }) => ($selected ? 3 : 2)};
  min-width: 0;
  margin: 0;
  padding: 0.5rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background-color: ${ColorData.colors.background};
  box-shadow: ${({ $selected }) =>
    $selected
      ? `inset 0 0 0 0.09375rem ${ReservationColors.skyblue}`
      : `inset 0 -0.09375rem 0 ${ReservationColors.cellLine}, inset 0.09375rem 0 0 ${ReservationColors.cellLine}`};
  color: ${ReservationColors.gray40};
  font-family: inherit;
  font-size: 1.3125rem;
  font-weight: 600;
  text-align: center;
  cursor: ${({ $readOnly }) => ($readOnly ? 'default' : 'pointer')};
  transition: box-shadow ${ColorData.interaction.transitionFast};

  ${({ $readOnly, $selected }) =>
    !$readOnly &&
    !$selected &&
    `
    &:hover,
    &:focus-visible {
      box-shadow: inset 0 0 0 1px ${ReservationColors.gray30};
      outline: none;
    }
  `}
`;
