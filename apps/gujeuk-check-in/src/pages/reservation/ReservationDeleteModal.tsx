import styled from "@emotion/styled";
import { Button } from "@shared/ui";
import { Modal } from "@shared/ui/modal";
import { ColorData } from "@shared/ui/design-system";
import type { Reservation } from "./ReservationData";
import { DeleteIcon } from "@shared/assets";

interface ReservationDeleteModalProps {
  reservation: Reservation;
  onClose: () => void;
  onConfirm: () => void;
}

export const ReservationDeleteModal = ({
  reservation,
  onClose,
  onConfirm,
}: ReservationDeleteModalProps) => (
  <Modal
    isOpen
    onClose={onClose}
    config={{
      icon: (
        <DeleteIconContainer>
          <DeleteIconImage src={DeleteIcon} alt="" />
        </DeleteIconContainer>
      ),
      title: `${reservation.userName}님의 예약을 삭제할까요?`,
      subtitle: "삭제한 예약은 되돌릴 수 없어요.",
      buttons: [
        { label: "취소", variant: "secondary", onClick: onClose },
        { label: "삭제하기", variant: "primary", onClick: onConfirm },
      ],
    }}
  >
    <TargetInfo>
      {reservation.place} · 오늘 {reservation.startTime} - {reservation.endTime}
    </TargetInfo>
  </Modal>
);

const DeleteIconContainer = styled.div`
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  margin: 0 auto;
  border-radius: 50%;
  background-color: ${ColorData.colors.negativeBackground};
`;

const DeleteIconImage = styled.img`
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  object-fit: contain;
`;

const TargetInfo = styled.p`
  margin: ${ColorData.spacing[16]} 0 0;
  padding: ${ColorData.spacing[8]};
  border-radius: ${ColorData.radius.medium};
  background-color: ${ColorData.colors.fillNormal};
  color: ${ColorData.colors.labelNeutral};
  font-size: ${ColorData.typography.caption.fontSize};
`;
