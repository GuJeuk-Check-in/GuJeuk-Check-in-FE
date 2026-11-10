import { useId } from "react";
import styled from "@emotion/styled";
import { FiTrash2 } from "react-icons/fi";
import { ColorData } from "@center/tokens";
import { formatTimeRange, type Reservation } from "./ReservationData";
import { ReservationDialog } from "./ReservationDialog";
import { ReservationColors } from "./reservationColors";

interface ReservationDeleteModalProps {
  reservation: Reservation;
  onClose: () => void;
  onConfirm: () => void;
  isPending: boolean;
}

export const ReservationDeleteModal = ({
  reservation,
  onClose,
  onConfirm,
  isPending,
}: ReservationDeleteModalProps) => {
  const titleId = useId();
  const summaryId = useId();

  return (
    <ReservationDialog
      labelledBy={titleId}
      describedBy={summaryId}
      closable={!isPending}
      onClose={onClose}
    >
      <Content>
        <IconWrapper>
          <FiTrash2 aria-hidden="true" />
        </IconWrapper>
        <Text>
          <Title id={titleId}>{reservation.userName}님의 예약을 삭제할까요?</Title>
          <Summary id={summaryId}>
            {reservation.place} · 오늘{" "}
            {formatTimeRange(reservation.startTime, reservation.endTime)}
          </Summary>
        </Text>
        <Actions>
          <ActionButton type="button" onClick={onClose} disabled={isPending}>
            취소
          </ActionButton>
          <ActionButton
            type="button"
            $danger
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? "삭제 중..." : "삭제하기"}
          </ActionButton>
        </Actions>
      </Content>
    </ReservationDialog>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
  padding-top: 0.25rem;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  color: ${ReservationColors.error};

  svg {
    width: 1.75rem;
    height: 1.75rem;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  text-align: center;
`;

const Title = styled.h2`
  margin: 0;
  overflow-wrap: anywhere;
  color: ${ReservationColors.gray40};
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.75rem;
  letter-spacing: -0.0375rem;
`;

const Summary = styled.p`
  margin: 0;
  padding: 0.75rem 1rem;
  color: ${ReservationColors.gray40};
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.375rem;
  letter-spacing: -0.025rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
`;

const ActionButton = styled.button<{ $danger?: boolean }>`
  flex: 1 1 0;
  min-width: 0;
  height: 3.25rem;
  padding: 0 1.25rem;
  border: 1px solid
    ${({ $danger }) => ($danger ? ReservationColors.error : ReservationColors.gray30)};
  border-radius: 0.75rem;
  background-color: ${({ $danger }) =>
    $danger ? ReservationColors.error : ColorData.colors.background};
  color: ${({ $danger }) =>
    $danger ? ColorData.colors.background : ReservationColors.gray40};
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: -0.025rem;
  cursor: pointer;

  &:hover:not(:disabled) {
    filter: brightness(0.96);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
