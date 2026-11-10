import {
  TileContainer,
  TileDeleteIcon,
  TileLabel,
  stopTileDrag,
} from '@center/ui/card';
import styled from '@emotion/styled';
import { LuCalendarCheck } from 'react-icons/lu';
import { MdClose, MdEdit } from 'react-icons/md';
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
  return (
    <Card isDisabled={isDeleting} $isReservable={purpose.reservationStatus}>
      {purpose.reservationStatus && (
        <ReservationBadge>
          <LuCalendarCheck aria-hidden="true" />
          예약 가능
        </ReservationBadge>
      )}
      <DeleteButton
        type="button"
        onClick={() => onDelete(purpose.id)}
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
        <EditButton
          type="button"
          className="purpose-edit-button"
          onClick={() => {
            if (!isDeleting) onEdit(purpose);
          }}
          onPointerDown={stopTileDrag}
          onMouseDown={stopTileDrag}
          disabled={isDeleting}
          aria-label={`${purpose.purpose} 수정`}
        >
          <MdEdit aria-hidden="true" />
        </EditButton>
      </Label>
    </Card>
  );
};

const Card = styled(TileContainer)<{ $isReservable: boolean }>`
  box-sizing: border-box;
  border-radius: 1.25rem;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  color: ${PurposeColors.gray40};
  outline: 0 solid ${PurposeColors.skyblue};
  outline-offset: ${({ $isReservable }) => ($isReservable ? '-2px' : '-1px')};
  transition: outline-width 0.15s ease;

  &:hover,
  &:focus-within {
    outline-width: ${({ $isReservable }) => ($isReservable ? '2px' : '1px')};
  }

  &:hover .purpose-edit-button,
  &:focus-within .purpose-edit-button {
    opacity: 1;
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
`;

const Label = styled(TileLabel)`
  gap: 0.6875rem;
  padding: 0.625rem;
  color: ${PurposeColors.gray40};
  font-size: 2rem;
  font-weight: 600;
  line-height: 2.25rem;
  letter-spacing: -0.05rem;
`;

const EditButton = styled.button`
  position: relative;
  z-index: 10;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  background: none;
  color: ${PurposeColors.gray10};
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.15s ease, color 0.15s ease;

  svg {
    width: 1.375rem;
    height: 1.375rem;
  }

  &:hover:not(:disabled) {
    color: ${PurposeColors.blue};
  }

  &:focus-visible {
    opacity: 1;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
