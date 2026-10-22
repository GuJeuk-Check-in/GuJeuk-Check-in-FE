import { Outlet } from 'react-router-dom';
import { AdminShell } from '@center/ui/layout';
import { AdminHeader } from '@widgets/admin-header';
import styled from '@emotion/styled';
import { adminTokens } from '@center/tokens';
import { css, Global, type Theme } from '@emotion/react';

export const AppLayout = () => (
  <>
    <Global styles={documentBackground} />
    <SkipLink href="#admin-page-title">본문으로 바로가기</SkipLink>
    <Layout sidebar={<AdminHeader />}>
      <Outlet />
    </Layout>
  </>
);

const documentBackground = (theme: Theme) => css`
  body {
    background-color: ${adminTokens(theme).colors.primary};
  }
`;

const Layout = styled(AdminShell)`
  background-color: ${({ theme }) => adminTokens(theme).colors.primary};
  color: ${({ theme }) => adminTokens(theme).colors.text};
  font-family: ${({ theme }) => adminTokens(theme).typography.bodyFamily};

  @media (max-width: 48rem) {
    --admin-sidebar-width: 0px;
    flex-direction: column;
  }
`;

const SkipLink = styled.a`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1001;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => adminTokens(theme).colors.white};
  color: ${({ theme }) => adminTokens(theme).colors.primaryDark};
  transform: translateY(calc(-100% - 1rem));

  &:focus {
    transform: translateY(0);
  }
`;
