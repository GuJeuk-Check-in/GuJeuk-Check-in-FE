import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { UseBackground } from '@shared/ui/Background';
import { AdminHeader } from '@widgets/admin-header';

export const AppLayout = () => {
  return (
    <Container>
      <UseBackground />
      <AdminHeader />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  --admin-sidebar-width: max(20vw, 17rem);
  flex: 1;
  box-sizing: border-box;
  display: flex;
  min-height: 100dvh;
`;

const ContentWrapper = styled.main`
  flex: 1;
  min-width: 0;
  margin-left: var(--admin-sidebar-width);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - var(--admin-sidebar-width));
  min-height: 100dvh;
  padding: clamp(1.5rem, 3.5vw, 3.5rem) clamp(1rem, 3.75vw, 3.75rem);
  gap: 1.25rem;
  box-sizing: border-box;
`;
