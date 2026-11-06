import {
  TileContainer as Container,
  TileDeleteIcon as DeleteIcon,
  TileLabel as Label,
  TileStyledEditIcon as StyledEditIcon,
  stopTileDrag,
} from '@center/ui/card';
import { ColorData } from '@center/tokens';
import styled from '@emotion/styled';
import { IoClose } from 'react-icons/io5';
import { ReservationBadgeIcon } from '@shared/assets';
import type { Purpose } from '../model/types';

const PurposeContainer = styled(Container)<{ $isReservable: boolean }>`
  outline: ${({ $isReservable }) =>
    $isReservable ? '2px solid rgba(0, 102, 255, 0.5)' : 'none'};
  outline-offset: -2px;
`;

const ReservationBadge = styled.span`
  position: absolute;
  top: 1rem;
  left: 1.125rem;
  display: flex;
  align-items: center;
  gap: ${ColorData.spacing[4]};
  padding: ${ColorData.spacing[4]} 0.625rem ${ColorData.spacing[4]}
    ${ColorData.spacing[8]};
  border-radius: ${ColorData.radius.pill};
  background-color: rgba(0, 102, 255, 0.1);
  color: ${ColorData.colors.primary};
  font-size: 0.8125rem;
  font-weight: 700;
`;

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
    <PurposeContainer
      isDisabled={isDeleting}
      $isReservable={purpose.reservationStatus}
    >
      {purpose.reservationStatus && (
        <ReservationBadge>
          <img src={ReservationBadgeIcon} alt="" width={14} height={14} />
          예약 가능
        </ReservationBadge>
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
          '...'
        ) : (
          <IoClose size="1.25rem" style={{ pointerEvents: 'none' }} />
        )}
      </DeleteIcon>

      <Label>
        {index}. {purpose.purpose}
        <StyledEditIcon
          size={18}
          onClick={() => {
            if (!isDeleting) onEdit(purpose);
          }}
          onPointerDown={stopTileDrag}
          onMouseDown={stopTileDrag}
          isDeleting={isDeleting}
        />
      </Label>
    </PurposeContainer>
  );
};
