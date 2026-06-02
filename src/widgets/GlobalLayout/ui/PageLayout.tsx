import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { UseBackground } from '@shared/ui/Background';
import { Header } from '@widgets/GlobalLayout';

interface PageLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
}

export const PageLayout = ({
  children,
  showHeader = true,
}: PageLayoutProps) => {
  return (
    <Container>
      <UseBackground />
      {showHeader && <Header />}
      <ContentWrapper>{children}</ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  box-sizing: border-box;
  display: flex;
  max-height: 100vh;
  overflow-y: hidden;
`;

const ContentWrapper = styled.div`
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
