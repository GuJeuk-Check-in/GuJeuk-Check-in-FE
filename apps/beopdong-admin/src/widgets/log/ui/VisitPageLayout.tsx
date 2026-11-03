import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import { DetailPanel } from '@shared/ui';

interface VisitPageLayoutProps {
  readonly title: string;
  readonly children: ReactNode;
}

export const VisitPageLayout = ({ title, children }: VisitPageLayoutProps) => (
  <Container>
    <Title id="admin-page-title" tabIndex={-1}>{title}</Title>
    <Wrapper>{children}</Wrapper>
  </Container>
);

const Container = styled.section`
  width: 100%;
  min-width: 0;
`;

const Title = styled.h1`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;

  &:focus {
    position: static;
    width: auto;
    height: auto;
    clip-path: none;
  }
`;

const Wrapper = styled(DetailPanel)`
  margin-block: 3.75rem;
`;
