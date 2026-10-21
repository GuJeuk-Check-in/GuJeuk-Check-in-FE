import styled from '@emotion/styled';
import { adminTokens } from '@center/tokens';
import { Sidebar, SidebarBrandImage } from '@center/ui/layout';
import { ExportButton, MenuButton as HeaderButton } from '@center/ui/button';
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';
import { BeopdongLogo, ExportIcon } from '@shared/assets';
import { ADMIN_NAVIGATION } from '@shared/config/adminNavigation';

export const AdminHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isMenuPath = ADMIN_NAVIGATION.some(({ path }) => Boolean(matchPath(path, pathname)));

  return (
    <SidebarLayout
      brand={
        <BrandLink to="/log" aria-label="법동청소년문화센터 방명록 조회">
          <BrandImage src={BeopdongLogo} width={465} height={73} alt="법동청소년문화센터" />
        </BrandLink>
      }
      navigation={
        <>
          <MenuList aria-label="관리자 메뉴">
            {ADMIN_NAVIGATION.map((item) => {
              const isCurrent = Boolean(matchPath(item.path, pathname)) ||
                ('detailPath' in item && !isMenuPath && Boolean(matchPath(item.detailPath, pathname)));

              return (
                <li key={item.path}>
                  <MenuButton onClick={() => navigate(item.path)} aria-current={isCurrent ? 'page' : undefined}>
                    {item.label}
                  </MenuButton>
                </li>
              );
            })}
          </MenuList>
          <ExportActions aria-label="엑셀 내보내기">
            {['방명록 엑셀 추출', '회원 정보 엑셀 추출'].map((label) => (
              <SidebarExportButton
                key={label}
                label={label}
                disabled
                icon={<img src={ExportIcon} width={32} height={32} alt="" />}
              />
            ))}
          </ExportActions>
        </>
      }
    />
  );
};

const SidebarLayout = styled(Sidebar)`
  padding-bottom: 2.5rem;

  > nav {
    width: auto;
    max-width: calc(100% - 2rem);
    gap: 2rem;
    overflow: visible;
    flex-shrink: 0;
  }

  @media (max-width: 48rem) {
    position: static;
    width: 100%;
    min-width: 0;
    height: auto;
    overflow: visible;
    padding: 1.5rem 1rem;

    > nav {
      width: 100%;
      max-width: none;
      margin: 0;
    }
  }
`;

const BrandLink = styled(Link)`
  display: flex;
  justify-content: center;
  flex-shrink: 0;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => adminTokens(theme).colors.primaryDark};
    outline-offset: -4px;
  }

  @media (max-width: 48rem) {
    justify-content: flex-start;
    padding: 0;
    margin-bottom: 1.5rem;
  }
`;

const BrandImage = styled(SidebarBrandImage)`
  @media (max-width: 48rem) {
    margin: 0;
  }
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (max-width: 48rem) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0;
    padding: 0;
  }
`;

const MenuButton = styled(HeaderButton)`
  &[aria-current='page'] {
    color: ${({ theme }) => adminTokens(theme).colors.primaryDark};
  }

  &:hover {
    color: ${({ theme }) => adminTokens(theme).colors.primaryDark};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => adminTokens(theme).colors.primaryDark};
    outline-offset: -2px;
  }

  @media (max-width: 48rem) {
    width: 100%;
    min-height: 3.5rem;
    text-align: left;
    overflow-wrap: anywhere;
  }
`;

const ExportActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 2rem;
  width: 100%;
  margin-top: auto;
  padding: 0 1rem;

  @media (max-width: 48rem) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
    padding: 0;
  }
`;

const SidebarExportButton = styled(ExportButton)`
  width: 100%;
  min-width: 0;
  padding-inline: 0.75rem;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    transform: none;
  }
`;
