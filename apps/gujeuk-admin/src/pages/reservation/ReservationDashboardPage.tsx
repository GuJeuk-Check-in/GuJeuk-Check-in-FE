import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { ColorData } from '@center/tokens';
import titlePlaque from '@shared/assets/reservation-title-plaque.png';
import titleStrap from '@shared/assets/reservation-title-strap.png';
import { usePurposeList } from '@entities/purpose';
import { useReservationList } from '@entities/reservation';
import { ReservationTable } from './ReservationTable';
import { TimeData, getActiveTimeIndex, toReservation } from './ReservationData';
import { ReservationColors } from './reservationColors';

const RESERVATION_POLL_INTERVAL_MS = 5_000;
const ADMIN_PURPOSE_POLL_INTERVAL_MS = 30_000;

const ReservationDashboardPage = ({
  readOnly = false,
}: {
  readOnly?: boolean;
}) => {
  const { data, isLoading, isError } = useReservationList(
    RESERVATION_POLL_INTERVAL_MS,
  );
  const {
    data: purposes,
    isLoading: isPurposeLoading,
    isError: isPurposeError,
  } = usePurposeList(
    readOnly ? RESERVATION_POLL_INTERVAL_MS : ADMIN_PURPOSE_POLL_INTERVAL_MS,
  );
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [toastContainer, setToastContainer] = useState<HTMLDivElement | null>(
    null,
  );

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const activeTimeIndex = getActiveTimeIndex(currentTime);
  const places = (purposes ?? [])
    .filter((purpose) => purpose.reservationStatus)
    .map((purpose) => purpose.purpose);
  const reservations = (data?.reservations ?? []).map(toReservation);
  const hasUnmappedReservations = reservations.some(
    (item) =>
      !places.includes(item.place) ||
      !TimeData.some((time) => time === item.startTime),
  );
  const isTableLoading = isLoading || isPurposeLoading;
  const isTableError = isError || isPurposeError;

  return (
    <Page $readOnly={readOnly}>
      {readOnly ? (
        <HiddenTitle>시설 예약 현황</HiddenTitle>
      ) : (
        <BoardHeader>
          <HiddenTitle>오늘의 예약 · 방문 목적별 예약 현황</HiddenTitle>
          <BoardPlaque src={titlePlaque} alt='' width={1446} height={120} />
        </BoardHeader>
      )}

      {isTableLoading && <p role='status'>예약 목록을 불러오는 중이에요.</p>}
      {isTableError && (
        <p role='alert'>
          예약 목록을 불러오지 못했어요. 잠시 후 자동으로 다시 조회해요.
        </p>
      )}
      {!readOnly && hasUnmappedReservations && (
        <p role='alert'>
          일부 예약은 현재 표에 없는 시설 또는 시간이라 표시할 수 없어요.
        </p>
      )}
      {data && purposes && places.length === 0 && (
        <p role='status'>
          {readOnly
            ? '예약 가능한 시설이 없어요. 관리자에게 문의해 주세요.'
            : '예약 가능한 시설이 없어요. 방문 목적 커스텀에서 예약 가능 시설을 설정해 주세요.'}
        </p>
      )}
      {data && places.length > 0 && (
        <TableViewport $readOnly={readOnly}>
          <ReservationTable
            places={places}
            reservations={reservations}
            activeTimeIndex={activeTimeIndex}
            readOnly={readOnly}
            toastContainer={toastContainer}
          />
        </TableViewport>
      )}
      {!readOnly && <ToastSlot ref={setToastContainer} />}
    </Page>
  );
};

export default ReservationDashboardPage;

const Page = styled.div<{ $readOnly: boolean }>`
  width: 100%;
  margin: 0 auto;
  color: ${({ $readOnly }) =>
    $readOnly ? ReservationColors.gray40 : ColorData.colors.background};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  ${({ $readOnly }) =>
    $readOnly
      ? `
    height: 100dvh;
    overflow: hidden;
  `
      : `
    flex: 1 1 auto;
    min-height: 0;
    gap: clamp(0.5rem, 1.6dvh, 1.25rem);
  `}
`;

const BoardHeader = styled.header`
  position: relative;
  flex-shrink: 0;
  margin-top: 2.766%;

  &::before,
  &::after {
    position: absolute;
    top: -33.333%;
    width: 1.66%;
    aspect-ratio: 24 / 78;
    background: url('${titleStrap}') center / contain no-repeat;
    content: '';
  }

  &::before {
    left: 9.682%;
  }

  &::after {
    right: 9.682%;
  }
`;

const BoardPlaque = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

const HiddenTitle = styled.h1`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const TableViewport = styled.div<{ $readOnly: boolean }>`
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto;

  ${({ $readOnly }) =>
    !$readOnly &&
    `
    padding: clamp(0.5rem, 1.15vw, 1rem);
    border-radius: 1.75rem;
    background: ${ReservationColors.boardFrame};
  `}
`;

const ToastSlot = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  min-height: 2.25rem;
`;
