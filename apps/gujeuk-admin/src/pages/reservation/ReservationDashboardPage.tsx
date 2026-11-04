import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { ColorData } from "@center/tokens";
import { ReservationTable } from "./ReservationTable";
import {
  PlaceData,
  ReservationData,
  TimeData,
  getActiveTimeIndex,
  type Reservation,
} from "./ReservationData";

const ReservationDashboardPage = () => {
  const [reservations, setReservations] = useState<Reservation[]>(ReservationData);
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const activeTimeIndex = getActiveTimeIndex(currentTime);
  const activeTime = TimeData[activeTimeIndex] ?? null;
  const inUse = reservations.filter(
    (reservation) => reservation.startTime === activeTime,
  ).length;
  const availability = {
    inUse,
    available: Math.max(PlaceData.length - inUse, 0),
  };

  const handleCreateReservation = (reservation: Reservation) => {
    setReservations((current) => [...current, reservation]);
  };

  const handleDeleteReservation = (reservation: Reservation) => {
    setReservations((current) =>
      current.filter((item) => item.id !== reservation.id),
    );
  };

  return (
    <Page>
      <Header>
        <div>
          <Eyebrow>운영</Eyebrow>
          <Title>시설 예약 현황</Title>
          <Description>
            사용 중 <strong>{availability.inUse}곳</strong> · 사용 가능{" "}
            <strong>{availability.available}곳</strong>
          </Description>
        </div>
        <RefreshButton type="button" onClick={() => window.location.reload()}>
          <FiRefreshCw aria-hidden="true" />
          새로고침
        </RefreshButton>
      </Header>

      <TableViewport>
        <ReservationTable
          reservations={reservations}
          activeTimeIndex={activeTimeIndex}
          onCreateReservation={handleCreateReservation}
          onDeleteReservation={handleDeleteReservation}
        />
      </TableViewport>
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
