import styled from "@emotion/styled";
import type { MouseEvent } from 'react';
import { ColorData } from "@shared/ui/design-system";

interface ReservationCardProps {
  userName: string;
  column: number;
  row: number;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

export const ReservationCard = ({
  userName,
  column,
  row,
  onClick,
}: ReservationCardProps) => {
  return (
    <Card
      $column={column}
      $row={row}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {userName}
    </Card>
  );
};

const Card = styled.div<{ $column: number; $row: number }>`
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
  border: 0;
  background-color: ${ColorData.colors.fillNormal};
  color: ${ColorData.colors.labelNormal};
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color ${ColorData.interaction.transitionFast},
    box-shadow ${ColorData.interaction.transitionFast};

  &:hover {
    background-color: ${ColorData.colors.primary8};
    box-shadow: ${ColorData.shadow.focus};
  }
`;
