import styled from "@emotion/styled";
import type { MouseEvent } from "react";
import { ColorData } from "@center/tokens";

interface ReservationCardProps {
  userName: string;
  place: string;
  time: string;
  column: number;
  row: number;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: () => void;
}

export const ReservationCard = ({
  userName,
  place,
  time,
  column,
  row,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: ReservationCardProps) => {
  return (
    <Card
      $column={column}
      $row={row}
      aria-label={`예약자 ${userName}, 장소 ${place}, 시간 ${time}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      type="button"
    >
      {userName}
    </Card>
  );
};

const Card = styled.button<{ $column: number; $row: number }>`
  grid-column: ${({ $column }) => $column};
  grid-row: ${({ $row }) => $row};
  z-index: 2;
  min-width: 0;
  margin: 0.25rem;
  padding: 0.5rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  background-color: ${ColorData.colors.fillNormal};
  color: ${ColorData.colors.labelNormal};
  font-family: inherit;
  font-size: 1.25rem;
  text-align: center;
  cursor: pointer;
  transition:
    background-color ${ColorData.interaction.transitionFast},
    box-shadow ${ColorData.interaction.transitionFast};

  &:hover {
    background-color: ${ColorData.colors.primaryLight};
    border-color: ${ColorData.colors.primary};
    box-shadow: ${ColorData.shadow.focus};
  }
`;
