import styled from '@emotion/styled';
import { Badge, Button } from '@shared/ui';
import { Modal } from '@shared/ui/modal';
import { ColorData } from '@shared/ui/design-system';
import type { Reservation } from './ReservationData';

interface ReservationDetailModalProps {
  reservation: Reservation;
  position: { top: number; left: number };
  onClose: () => void;
  onDelete: () => void;
}

export const ReservationDetailModal = ({
  reservation,
  position,
  onClose,
  onDelete,
}: ReservationDetailModalProps) => (
  <Modal
    isOpen
    onClose={onClose}
    config={{
      title: reservation.userName,
      subtitle: '',
      buttons: [
        { label: '닫기', variant: 'secondary', onClick: onClose },
        { label: '예약 삭제', variant: 'primary', onClick: onDelete },
      ],
    }}
    size="compact"
    mode="popover"
    position={position}
    titleExtra={<Badge>예약</Badge>}
  >
    <DetailList>
      <DetailRow><Label>시설</Label><Value>{reservation.place}</Value></DetailRow>
      <DetailRow><Label>시간</Label><Value>오늘 {reservation.startTime} - {reservation.endTime}</Value></DetailRow>
      <DetailRow><Label>인원</Label><Value>{reservation.people}</Value></DetailRow>
      <DetailRow><Label>연락처</Label><Value>{reservation.phone}</Value></DetailRow>
    </DetailList>
  </Modal>
);

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
