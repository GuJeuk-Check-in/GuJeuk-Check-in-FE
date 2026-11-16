import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import { DetailPanel, PageTitle } from '@shared/ui';

interface VisitPageLayoutProps {
  readonly title: string;
  readonly children: ReactNode;
}

export const VisitPageLayout = ({ title, children }: VisitPageLayoutProps) => (
  <Container>
    <PageTitle>{title}</PageTitle>
    <DetailPanel>{children}</DetailPanel>
  </Container>
);

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  min-width: 0;
`;
