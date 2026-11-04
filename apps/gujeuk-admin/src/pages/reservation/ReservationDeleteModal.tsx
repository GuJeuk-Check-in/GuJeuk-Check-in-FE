import styled from "@emotion/styled";
import { ColorData } from "@center/tokens";
import { Modal } from "@shared/ui/modal";
import { DeleteIcon } from "@shared/assets";
import { getNextTime, type Reservation } from "./ReservationData";

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
  <DeleteModal
    isOpen
    onClose={onClose}
    size="compact"
    config={{
      icon: (
        <DeleteIconContainer>
          <DeleteIconImage src={DeleteIcon} alt="" />
        </DeleteIconContainer>
      ),
      title: `${reservation.userName}님의 예약을 삭제할까요?`,
      subtitle: "",
    }}
  >
    <TargetInfo>
      {reservation.place} · 오늘 {reservation.startTime} - {getNextTime(reservation.startTime)}
    </TargetInfo>
    <Notice>삭제한 예약은 되돌릴 수 없어요.</Notice>
    <Actions>
      <ActionButton type="button" onClick={onClose}>취소</ActionButton>
      <ActionButton type="button" $danger onClick={onConfirm}>삭제하기</ActionButton>
    </Actions>
  </DeleteModal>
);

const DeleteModal = styled(Modal)`
  h2 {
    text-align: center;
    padding-right: 0;
  }
`;

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
  margin: ${ColorData.spacing[8]} 0 0;
  padding: ${ColorData.spacing[8]};
  border-radius: ${ColorData.radius.medium};
  background-color: ${ColorData.colors.fillNormal};
  color: ${ColorData.colors.labelNeutral};
  font-size: ${ColorData.typography.caption.fontSize};
`;

const Notice = styled.p`
  margin: ${ColorData.spacing[12]} 0 ${ColorData.spacing[16]};
  color: ${ColorData.colors.labelAlternative};
  font-size: ${ColorData.typography.caption.fontSize};
`;

const Actions = styled.div`
  display: flex;
  gap: ${ColorData.spacing[8]};
`;

const ActionButton = styled.button<{ $danger?: boolean }>`
  flex: 1;
  min-height: 2.75rem;
  border: 0;
  border-radius: ${ColorData.radius.medium};
  background-color: ${({ $danger }) => $danger ? ColorData.colors.negative : ColorData.colors.fillNormal};
  color: ${({ $danger }) => $danger ? ColorData.colors.background : ColorData.colors.labelNormal};
  font: inherit;
  cursor: pointer;
`;
