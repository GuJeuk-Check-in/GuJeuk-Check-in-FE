import styled from "@emotion/styled";
import { useState } from "react";
import { Sidebar, SidebarBrandImage, AdminBackground } from "@center/ui/layout";
import { MenuLink } from "@center/ui/button";
import { NavLink } from "react-router-dom";
import { FiRefreshCw } from "react-icons/fi";
import { Logo } from "@shared/assets";
import { ColorData } from "@shared/ui/design-system";
import { ReservationTable } from "./ReservationTable";

const HeaderButton = MenuLink.withComponent(NavLink);

const navigationItems = [
  { label: "시설 이용 목록 조회", to: "/check-in" },
  { label: "방문 목적 커스텀", to: "/purpose" },
  { label: "회원 목록 조회", to: "/members" },
  { label: "시설 이용 기록 추가", to: "/record" },
  { label: "거주지 커스텀", to: "/residence" },
  { label: "예약확인", to: "/reservation" },
];

const ReservationDashboardPage = () => {
  const [availability, setAvailability] = useState({ inUse: 0, available: 9 });

  return (
    <Layout>
      <AdminBackground />
      <Sidebar
        brand={<SidebarBrandImage src={Logo} alt="구즉 청소년문화의집" />}
        navigation={
          <>
            {navigationItems.map((item) => (
              <HeaderButton key={item.to} to={item.to}>
                {item.label}
              </HeaderButton>
            ))}
          </>
        }
      />
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
          <ReservationTable onAvailabilityChange={setAvailability} />
        </TableViewport>
        <HelpText>
          빈 칸을 누르면 예약을 추가하고, 예약된 칸을 누르면 취소할 수 있어요.
          예약은 1인 1시간만 가능해요.
        </HelpText>
      </Page>
    </Layout>
  );
};

export default ReservationDashboardPage;

const Layout = styled.div`
  --admin-sidebar-width: max(20vw, 17rem);
  min-height: 100dvh;
`;

const Page = styled.main`
  width: calc(100% - var(--admin-sidebar-width));
  margin-left: var(--admin-sidebar-width);
  min-width: 0;
  min-height: 100dvh;
  padding: 7rem ${ColorData.spacing[32]} ${ColorData.spacing[32]};
  box-sizing: border-box;
  color: ${ColorData.colors.background};
`;

const Header = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${ColorData.spacing[4]};
  width: min(100%, 80rem);
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
  width: min(100%, 80rem);
  margin: 0 auto;
  overflow-x: auto;
  border-radius: ${ColorData.radius.modal};
`;

const HelpText = styled.p`
  width: min(100%, 80rem);
  margin: ${ColorData.spacing[8]} auto 0;
  color: ${ColorData.colors.primaryLight};
  font-size: ${ColorData.typography.caption.fontSize};
`;
