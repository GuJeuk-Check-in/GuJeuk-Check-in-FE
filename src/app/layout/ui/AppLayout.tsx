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
  flex: 1;
  box-sizing: border-box;
  display: flex;
  max-height: 100dvh;
  overflow-y: hidden;
`;

const ContentWrapper = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 3.5rem 3.75rem;
  gap: 1.25rem;
  box-sizing: border-box;
  overflow-y: scroll;
`;
