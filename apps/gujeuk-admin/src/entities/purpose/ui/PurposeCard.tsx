import { useRef, type KeyboardEvent, type MouseEvent } from 'react';
import { TileContainer, TileDeleteIcon, TileLabel } from '@center/ui/card';
import styled from '@emotion/styled';
import { LuCalendarCheck } from 'react-icons/lu';
import { MdClose } from 'react-icons/md';
import subItemIcon from '@shared/assets/purpose-sub-item.png';
import { usePurposeStore } from '../model/purposeStore';
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
  const hasSubPurposes = usePurposeStore((state) =>
    Boolean(state.subPurposesByPurposeId[purpose.id]?.length),
  );
  const editLabel = [
    purpose.purpose,
    purpose.reservationStatus && '예약 가능',
    hasSubPurposes && '세부 항목 있음',
  ]
    .filter(Boolean)
    .join(', ');

  const openEdit = () => {
    if (!isDeleting) onEdit(purpose);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const start = pressStartRef.current;
    pressStartRef.current = null;
    if (
      event.detail > 0 &&
      start &&
      Math.hypot(event.clientX - start.x, event.clientY - start.y) >=
        DRAG_DISTANCE
    ) {
      return;
    }
    openEdit();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') event.stopPropagation();
  };

  return (
    <Card isDisabled={isDeleting} $isReservable={purpose.reservationStatus}>
      <EditButton
        type='button'
        aria-label={`${editLabel} 수정`}
        disabled={isDeleting}
        onMouseDown={(event) => {
          pressStartRef.current = { x: event.clientX, y: event.clientY };
        }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      />
      {(purpose.reservationStatus || hasSubPurposes) && (
        <BadgeList aria-hidden='true'>
          {purpose.reservationStatus && (
            <Badge>
              <LuCalendarCheck />
              예약 가능
            </Badge>
          )}
          {hasSubPurposes && (
            <Badge>
              <img src={subItemIcon} width={14} height={14} alt='세부 항목 아이콘' />
              세부 항목
            </Badge>
          )}
        </BadgeList>
      )}
      <DeleteButton
        type='button'
        onClick={() => onDelete(purpose.id)}
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        isDeleting={isDeleting}
        disabled={isDeleting}
        aria-label={`${purpose.purpose} 삭제`}
      >
        {isDeleting ? '...' : <MdClose aria-hidden='true' />}
      </DeleteButton>

      <Label aria-hidden='true'>
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

  &:hover {
    outline-width: ${({ $isReservable }) => ($isReservable ? '2px' : '1px')};
  }
`;

const EditButton = styled.button`
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  border-radius: inherit;
  background: none;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${PurposeColors.blue};
    outline-offset: -2px;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const BadgeList = styled.div`
  position: absolute;
  top: 1.375rem;
  left: 1.75rem;
  right: 4.875rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem 1rem;
`;

const Badge = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${PurposeColors.blue};
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 700;
  white-space: nowrap;

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
