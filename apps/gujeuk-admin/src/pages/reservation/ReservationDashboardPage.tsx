import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { ColorData } from "@center/tokens";
import { useReservationList } from "@entities/reservation";
import { ReservationTable } from "./ReservationTable";
import {
  PlaceData,
  TimeData,
  getActiveTimeIndex,
} from "./ReservationData";

const ReservationDashboardPage = () => {
  const { data, isLoading, isError, refetch } = useReservationList();
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const activeTimeIndex = getActiveTimeIndex(currentTime);
  const reservations = (data?.reservations ?? []).map((item) => ({
    id: item.id,
    userName: item.name,
    place: item.purpose,
    startTime: item.startTime.slice(0, 5).replace(/^0/, ''),
    people: { male: item.maleCount, female: item.femaleCount },
    phone: item.phone,
  }));
  const hasUnmappedReservations = reservations.some(
    (item) => !PlaceData.some((place) => place === item.place) ||
      !TimeData.some((time) => time === item.startTime),
  );

  return (
    <Page>
      <Header>
        <div>
          <Eyebrow>운영</Eyebrow>
          <Title>시설 예약 현황</Title>
          <Description>
            사용 중 <strong>{data ? `${data.inUseCount}곳` : '-'}</strong> · 사용 가능{" "}
            <strong>{data ? `${data.availableCount}곳` : '-'}</strong>
          </Description>
        </div>
        <RefreshButton type="button" onClick={() => void refetch()}>
          <FiRefreshCw aria-hidden="true" />
          새로고침
        </RefreshButton>
      </Header>

      {isLoading && <p role="status">예약 목록을 불러오는 중이에요.</p>}
      {isError && <p role="alert">예약 목록을 불러오지 못했어요. 새로고침을 눌러 다시 시도해 주세요.</p>}
      {hasUnmappedReservations && <p role="alert">일부 예약은 현재 표에 없는 시설 또는 시간이라 표시할 수 없어요.</p>}
      {data && <TableViewport>
        <ReservationTable
          reservations={reservations}
          activeTimeIndex={activeTimeIndex}
        />
      </TableViewport>}
      <HelpText>
        빈 칸을 누르면 예약을 추가하고, 예약된 칸을 누르면 취소할 수 있어요.
        예약은 1인 1시간만 가능해요.
      </HelpText>
    </Page>
  );
};

export default ReservationDashboardPage;

const Page = styled.div`
  width: 100%;
  margin: 0 auto;
  color: ${ColorData.colors.background};
`;

const Header = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${ColorData.spacing[4]};
  width: 100%;
  margin: 0 auto ${ColorData.spacing[16]};
`;

const Eyebrow = styled.p`
  margin: 0 0 ${ColorData.spacing[4]};
  color: ${ColorData.colors.primaryLight};
  font-size: ${ColorData.typography.caption.fontSize};
`;

const Title = styled.h1`
  margin: 0;
  font-size: ${ColorData.typography.title.fontSize};
  line-height: ${ColorData.typography.title.lineHeight};
`;

const Description = styled.p`
  margin: ${ColorData.spacing[8]} 0 0;
  color: ${ColorData.colors.primaryLight};
  font-size: ${ColorData.typography.body.fontSize};

  strong {
    color: ${ColorData.colors.background};
  }
`;

const RefreshButton = styled.button`
  min-height: 2.5rem;
  margin-right: ${ColorData.spacing[16]};
  padding: 0 ${ColorData.spacing[16]};
  border: 0;
  border-radius: ${ColorData.radius.large};
  background-color: ${ColorData.colors.background};
  font: inherit;
  cursor: pointer;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  gap: ${ColorData.spacing[4]};

  &:hover {
    background-color: ${ColorData.colors.primaryLight};
  }
`;

const TableViewport = styled.div`
  width: calc(100% - ${ColorData.spacing[32]});
  margin: 0 auto;
  overflow-x: auto;
  border-radius: ${ColorData.radius.modal};
`;

const HelpText = styled.p`
  width: 100%;
  margin: ${ColorData.spacing[8]} auto 0;
  color: ${ColorData.colors.primaryLight};
  font-size: ${ColorData.typography.caption.fontSize};
`;
