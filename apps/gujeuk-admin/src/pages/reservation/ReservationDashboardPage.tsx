import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { ColorData } from "@center/tokens";
import { usePurposeList } from "@entities/purpose";
import { useReservationList } from "@entities/reservation";
import { ReservationTable } from "./ReservationTable";
import { TimeData, getActiveTimeIndex, toReservation } from "./ReservationData";
import { ReservationColors } from "./reservationColors";

const ReservationDashboardPage = ({
  readOnly = false,
}: {
  readOnly?: boolean;
}) => {
  const { data, isLoading, isError, refetch } = useReservationList(
    readOnly ? 5_000 : undefined,
  );
  const {
    data: purposes,
    isLoading: isPurposeLoading,
    isError: isPurposeError,
    refetch: refetchPurposes,
  } = usePurposeList(readOnly ? 5_000 : undefined);
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

  const handleRefresh = () => {
    void refetch();
    void refetchPurposes();
  };

  return (
    <Page $readOnly={readOnly}>
      {readOnly ? (
        <HiddenTitle>시설 예약 현황</HiddenTitle>
      ) : (
        <Header>
          <Title>시설 예약 현황</Title>
          <RefreshButton type="button" onClick={handleRefresh}>
            <FiRefreshCw aria-hidden="true" />
            새로고침
          </RefreshButton>
        </Header>
      )}

      {isTableLoading && <p role="status">예약 목록을 불러오는 중이에요.</p>}
      {isTableError && (
        <p role="alert">
          예약 목록을 불러오지 못했어요.
          {!readOnly && " 새로고침을 눌러 다시 시도해 주세요."}
        </p>
      )}
      {!readOnly && hasUnmappedReservations && (
        <p role="alert">
          일부 예약은 현재 표에 없는 시설 또는 시간이라 표시할 수 없어요.
        </p>
      )}
      {data && purposes && places.length === 0 && (
        <p role="status">
          {readOnly
            ? "예약 가능한 시설이 없어요. 관리자에게 문의해 주세요."
            : "예약 가능한 시설이 없어요. 방문 목적 커스텀에서 예약 가능 시설을 설정해 주세요."}
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
  background-color: ${({ $readOnly }) =>
    $readOnly ? ColorData.colors.background : "transparent"};
  color: ${({ $readOnly }) =>
    $readOnly ? ReservationColors.gray40 : ColorData.colors.background};

  ${({ $readOnly }) =>
    $readOnly &&
    `
    display: flex;
    flex-direction: column;
    height: 100dvh;
    box-sizing: border-box;
    overflow: hidden;
  `}
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${ColorData.spacing[16]};
  width: calc(100% - ${ColorData.spacing[32]});
  margin: 0 auto 1.875rem;
`;

const Title = styled.h1`
  margin: 0;
  color: ${ColorData.colors.background};
  font-size: 2.4375rem;
  font-weight: 700;
  line-height: 2.25rem;
  letter-spacing: -0.056rem;
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

const RefreshButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  min-width: 8.75rem;
  height: 3rem;
  padding: 0 1.25rem;
  border: 0;
  border-radius: 0.75rem;
  background-color: ${ColorData.colors.background};
  color: ${ReservationColors.gray40};
  font: inherit;
  font-size: 1.21875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color ${ColorData.interaction.transitionFast};

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  &:hover {
    background-color: ${ColorData.colors.primaryLight};
  }
`;

const TableViewport = styled.div<{ $readOnly: boolean }>`
  width: calc(100% - ${ColorData.spacing[32]});
  margin: 0 auto;
  overflow-x: auto;
  border-radius: 1.125rem;
  box-shadow: 0 0.09375rem 0.1875rem rgba(0, 0, 0, 0.08);

  ${({ $readOnly }) =>
    $readOnly &&
    `
    flex: 1 1 auto;
    width: 100%;
    min-height: 0;
    border-radius: 0;
    box-shadow: none;
  `}
`;

const ToastSlot = styled.div`
  display: flex;
  justify-content: flex-end;
  width: calc(100% - ${ColorData.spacing[32]});
  min-height: 3.5rem;
  margin: 1rem auto 0;
`;
