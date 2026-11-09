import styled from "@emotion/styled";
import type { MouseEvent } from "react";
import { ColorData } from "@center/tokens";

interface ReservationCardProps {
  userName: string;
  place: string;
  time: string;
  column: number;
  row: number;
  readOnly?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const ReservationCard = ({
  userName,
  place,
  time,
  column,
  row,
  readOnly = false,
  onClick,
  onMouseEnter,
}: ReservationCardProps) => {
  return (
    <Card
      as={readOnly ? 'div' : 'button'}
      $column={column}
      $row={row}
      aria-label={`예약자 ${userName}, 장소 ${place}, 시간 ${time}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      type={readOnly ? undefined : 'button'}
      $readOnly={readOnly}
    >
      {userName}
    </Card>
  );
};

const Card = styled.button<{ $column: number; $row: number; $readOnly: boolean }>`
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
  border: 1px solid ${ColorData.colors.primary};
  background-color: ${ColorData.colors.fillNormal};
  color: ${ColorData.colors.labelNormal};
  font-family: inherit;
  font-size: 1.25rem;
  text-align: center;
  cursor: ${({ $readOnly }) => ($readOnly ? 'default' : 'pointer')};
  transition:
    background-color ${ColorData.interaction.transitionFast},
    box-shadow ${ColorData.interaction.transitionFast};

  &:hover {
    background-color: ${({ $readOnly }) => $readOnly ? ColorData.colors.fillNormal : ColorData.colors.primary8};
    box-shadow: ${({ $readOnly }) => $readOnly ? 'none' : ColorData.shadow.focus};
  }
`;
