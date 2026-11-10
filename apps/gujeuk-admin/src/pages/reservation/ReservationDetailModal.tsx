import { useEffect, useId, useRef } from 'react';
import styled from '@emotion/styled';
import { FiTrash2, FiX } from 'react-icons/fi';
import { ColorData } from '@center/tokens';
import {
  formatPeople,
  formatTimeRange,
  type Reservation,
} from './ReservationData';
import { ReservationColors } from './reservationColors';

interface ReservationDetailModalProps {
  reservation: Reservation;
  position: { top: number; left: number };
  onClose: () => void;
  onDelete: () => void;
}

const RESERVATION_CARD_ATTRIBUTE = 'data-reservation-card';

export const ReservationDetailModal = ({
  reservation,
  position,
  onClose,
  onDelete,
}: ReservationDetailModalProps) => {
  const titleId = useId();
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    popoverRef.current?.querySelector<HTMLElement>('button')?.focus();

    return () => {
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus();
      }
    };
  }, [reservation.id]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (popoverRef.current?.contains(target)) return;
      if (target.closest(`[${RESERVATION_CARD_ATTRIBUTE}]`)) return;
      onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [onClose]);

  return (
    <Popover
      ref={popoverRef}
      role="dialog"
      aria-labelledby={titleId}
      $top={position.top}
      $left={position.left}
    >
      <Header>
        <Title id={titleId}>{reservation.userName}</Title>
        <CloseButton type="button" onClick={onClose} aria-label="예약 상세 닫기">
          <FiX aria-hidden="true" />
        </CloseButton>
      </Header>
      <DetailList>
        <DetailRow>
          <Label>시설</Label>
          <Value>{reservation.place}</Value>
        </DetailRow>
        <DetailRow>
          <Label>시간</Label>
          <Value>
            오늘 {formatTimeRange(reservation.startTime, reservation.endTime)} (1시간)
          </Value>
        </DetailRow>
        <DetailRow>
          <Label>인원</Label>
          <Value>{formatPeople(reservation.people)}</Value>
        </DetailRow>
        <DetailRow>
          <Label>연락처</Label>
          <Value>{reservation.phone}</Value>
        </DetailRow>
      </DetailList>
      <Divider />
      <Actions>
        <ActionButton type="button" onClick={onClose}>
          닫기
        </ActionButton>
        <ActionButton type="button" $danger onClick={onDelete}>
          <FiTrash2 aria-hidden="true" />
          예약 삭제
        </ActionButton>
      </Actions>
    </Popover>
  );
};

const Popover = styled.div<{ $top: number; $left: number }>`
  position: fixed;
  top: ${({ $top }) => `${$top}px`};
  left: ${({ $left }) => `${$left}px`};
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 22.5rem;
  max-width: calc(100vw - 2rem);
  max-height: calc(100dvh - 2rem);
  box-sizing: border-box;
  overflow-y: auto;
  padding: 1.5rem;
  border: 1px solid ${ReservationColors.gray30};
  border-radius: 1rem;
  background-color: ${ColorData.colors.background};
  filter: drop-shadow(0 0.75rem 1rem rgba(0, 0, 0, 0.16));
  font-family: ${ColorData.typography.fontFamily};
  text-align: left;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
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

const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 2rem;
  height: 2rem;
  margin: -0.25rem;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: none;
  color: ${ReservationColors.gray40};
  cursor: pointer;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  &:hover {
    background-color: ${ColorData.colors.fillNormal};
  }
`;

const DetailList = styled.dl`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 0;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Label = styled.dt`
  flex: 0 0 3.5rem;
  color: ${ReservationColors.gray20};
  font-size: 0.875rem;
  line-height: 1.4;
`;

const Value = styled.dd`
  margin: 0;
  min-width: 0;
  overflow-wrap: anywhere;
  color: ${ReservationColors.gray40};
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.375rem;
  letter-spacing: -0.025rem;
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  margin: 0;
  border: 0;
  background-color: ${ReservationColors.gray10};
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button<{ $danger?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  flex: 1 1 0;
  min-width: 0;
  height: 3rem;
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

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  &:hover {
    filter: brightness(0.96);
  }
`;
