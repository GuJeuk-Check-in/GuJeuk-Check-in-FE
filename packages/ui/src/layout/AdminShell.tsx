import { adminTokens } from '@center/tokens';
import styled from '@emotion/styled';
import type { ReactNode } from 'react';

export interface AdminShellProps {
  sidebar: ReactNode;
  children: ReactNode;
  background?: ReactNode;
}

export const AdminShell = ({ sidebar, children, background }: AdminShellProps) => (
  <Container>
    {background}
    {sidebar}
    <ContentWrapper>{children}</ContentWrapper>
  </Container>
);

const Container = styled.div`
  --admin-sidebar-width: ${({ theme }) => adminTokens(theme).components.sidebarWidth};
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
