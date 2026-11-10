import { useRef, type KeyboardEvent, type MouseEvent } from 'react';
import { TileContainer, TileDeleteIcon, TileLabel } from '@center/ui/card';
import styled from '@emotion/styled';
import { LuCalendarCheck } from 'react-icons/lu';
import { MdClose } from 'react-icons/md';
import type { Purpose } from '../model/types';
import { PurposeColors } from './purposeColors';

interface PurposeProps {
  purpose: Purpose;
  index: number;
  onDelete: (id: number) => void;
  onEdit: (purpose: Purpose) => void;
  isDeleting: boolean;
}

export const PurposeCard = ({
  index,
  purpose,
  onDelete,
  onEdit,
  isDeleting,
}: PurposeProps) => {
  const pressStartRef = useRef<{ x: number; y: number } | null>(null);

  const openEdit = () => {
    if (!isDeleting) onEdit(purpose);
  };

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const start = pressStartRef.current;
    pressStartRef.current = null;
    if (
      start &&
      Math.hypot(event.clientX - start.x, event.clientY - start.y) >= DRAG_DISTANCE
    ) {
      return;
    }
    openEdit();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    event.stopPropagation();
    openEdit();
  };

  return (
    <Card
      isDisabled={isDeleting}
      $isReservable={purpose.reservationStatus}
      role="button"
      tabIndex={isDeleting ? -1 : 0}
      aria-label={`${purpose.purpose} 수정`}
      aria-disabled={isDeleting}
      onMouseDown={(event) => {
        pressStartRef.current = { x: event.clientX, y: event.clientY };
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {purpose.reservationStatus && (
        <ReservationBadge>
          <LuCalendarCheck aria-hidden="true" />
          예약 가능
        </ReservationBadge>
      )}
      <DeleteButton
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onDelete(purpose.id);
        }}
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        isDeleting={isDeleting}
        disabled={isDeleting}
        aria-label={`${purpose.purpose} 삭제`}
      >
        {isDeleting ? '...' : <MdClose aria-hidden="true" />}
      </DeleteButton>

      <Label>
        {index}. {purpose.purpose}
      </Label>
    </Card>
  );
};

const DRAG_DISTANCE = 8;

const Card = styled(TileContainer)<{ $isReservable: boolean }>`
  box-sizing: border-box;
  border-radius: 1.25rem;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  color: ${PurposeColors.gray40};
  outline: 0 solid ${PurposeColors.skyblue};
  outline-offset: ${({ $isReservable }) => ($isReservable ? '-2px' : '-1px')};
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  transition: outline-width 0.15s ease;

  &:hover,
  &:focus-visible {
    outline-width: ${({ $isReservable }) => ($isReservable ? '2px' : '1px')};
  }

  &:focus-visible {
    outline-color: ${PurposeColors.blue};
    outline-offset: -2px;
    outline-width: 2px;
  }
`;

const ReservationBadge = styled.span`
  position: absolute;
  top: 1.125rem;
  left: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.625rem 0.25rem 0.5rem;
  border-radius: 999px;
  background-color: #ffffff;
  color: ${PurposeColors.blue};
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 700;

  svg {
    width: 0.875rem;
    height: 0.875rem;
    color: ${PurposeColors.skyblue};
  }
`;

const DeleteButton = styled(TileDeleteIcon)`
  top: 1.1875rem;
  right: 2.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  color: ${({ isDeleting }) => (isDeleting ? '#aaaaaa' : PurposeColors.error)};

  svg {
    width: 1.5rem;
    height: 1.5rem;
    pointer-events: none;
  }

  &:focus-visible {
    outline: 2px solid ${PurposeColors.skyblue};
    outline-offset: 2px;
    border-radius: 50%;
  }
`;

const Label = styled(TileLabel)`
  padding: 0.625rem;
  color: ${PurposeColors.gray40};
  font-size: 2rem;
  font-weight: 600;
  line-height: 2.25rem;
  letter-spacing: -0.05rem;
`;
