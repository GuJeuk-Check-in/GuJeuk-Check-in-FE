import { adminTokens } from '@center/tokens';
import styled from '@emotion/styled';
import type { ReactNode } from 'react';

export interface SidebarProps { brand: ReactNode; navigation: ReactNode; className?: string; }

export const Sidebar = ({ brand, navigation, className }: SidebarProps) => (
  <Container className={className}>
    {brand}
    <ButtonWrapper>{navigation}</ButtonWrapper>
  </Container>
);

const Container = styled.header`
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 1000;
  width: var(--admin-sidebar-width, ${({ theme }) => adminTokens(theme).components.sidebarWidth});
  min-width: var(--admin-sidebar-width, ${({ theme }) => adminTokens(theme).components.sidebarWidth});
  height: 100dvh;
  background-color: ${({ theme }) => adminTokens(theme).colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  flex-shrink: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 2rem 0;
`;

export const SidebarBrandImage = styled.img`
  width: 15rem;
  height: auto;
  object-fit: contain;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 3rem;
  cursor: pointer;
  flex-shrink: 0;
`;

const ButtonWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  flex: 1;
  min-width: 0;
  flex-wrap: wrap;
  overflow: hidden;
  font-size: 28px;
  margin-right: 1.25rem;
`;
