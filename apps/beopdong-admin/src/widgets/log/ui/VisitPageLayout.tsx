import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import { adminTokens } from '@center/tokens';

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

const Wrapper = styled.div`
  width: min(100%, calc(90% + 5rem), 65rem);
  margin: 3.75rem auto;
  padding: 2.5rem;
  background-color: ${({ theme }) => adminTokens(theme).colors.white};
  border-radius: 1.25rem;
  box-shadow: 0 0.25rem 1.25rem rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;

  @media (max-width: 48rem) {
    width: 100%;
    margin-block: 3.75rem;
    padding: 1.5rem;
  }
`;
