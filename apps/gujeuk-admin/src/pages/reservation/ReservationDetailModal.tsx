import styled from '@emotion/styled';
import { ColorData } from '@center/tokens';
import { Popover } from '@shared/ui/popover';
import { FiTrash2 } from 'react-icons/fi';
import {
  formatPeople,
  type Reservation,
} from './ReservationData';

interface ReservationDetailModalProps {
  reservation: Reservation;
  position: { top: number; left: number };
  onClose: () => void;
  onDelete: () => void;
  autoFocus: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const ReservationDetailModal = ({
  reservation,
  position,
  onClose,
  onDelete,
  autoFocus,
  onMouseEnter,
  onMouseLeave,
}: ReservationDetailModalProps) => (
  <Popover
    isOpen
    autoFocus={autoFocus}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClose={onClose}
    config={{
      title: reservation.userName,
      subtitle: '',
      buttons: [
        { label: '닫기', variant: 'secondary', onClick: onClose },
        {
          label: '예약 삭제',
          icon: <FiTrash2 aria-hidden="true" />,
          variant: 'primary',
          bgColor: ColorData.colors.negative,
          onClick: onDelete,
        },
      ],
    }}
    position={position}
    titleExtra={<Badge>예약</Badge>}
  >
    <DetailList>
      <DetailRow><Label>시설</Label><Value>{reservation.place}</Value></DetailRow>
      <DetailRow><Label>시간</Label><Value>오늘 {reservation.startTime} - {reservation.endTime}</Value></DetailRow>
      <DetailRow><Label>인원</Label><Value>{formatPeople(reservation.people)}</Value></DetailRow>
      <DetailRow><Label>연락처</Label><Value>{reservation.phone}</Value></DetailRow>
    </DetailList>
  </Popover>
);

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem 0.75rem;
  border-radius: 999px;
  background-color: ${ColorData.colors.primary8};
  color: ${ColorData.colors.primary};
  font-size: ${ColorData.typography.caption.fontSize};
  font-weight: 600;
  font-family: inherit;
  line-height: 1;
  transform: translateY(-0.125rem);
`;

const DetailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${ColorData.spacing[8]};
  margin-top: ${ColorData.spacing[12]};
  text-align: left;
`;

const DetailRow = styled.div`
  display: grid;
  grid-template-columns: 3.5rem 1fr;
  gap: ${ColorData.spacing[12]};
  font-size: ${ColorData.typography.caption.fontSize};
`;

const Label = styled.span`
  color: ${ColorData.colors.labelAssistive};
`;

const Value = styled.span`
  color: ${ColorData.colors.labelNeutral};
`;
