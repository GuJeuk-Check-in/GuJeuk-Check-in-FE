import { useState, type ReactNode } from 'react';
import styled from '@emotion/styled';
import { adminTokens, ColorData } from '@center/tokens';
import { LoadErrorView } from '@center/ui/feedback';
import { useUserList } from '@entities/user';
import { useSearchUser } from '@features/user/user-search';
import { UserListWithSearch } from '@widgets/user';
import { PageTitle } from '@shared/ui';

const UserInformation = () => {
  const [page, setPage] = useState(0);
  const userList = useUserList(page);
  const { searchName, setSearchName, isSearching, query: userSearch } = useSearchUser();
  const slice = userList.isPlaceholderData ? undefined : userList.data?.slice;
  const pageNumber = slice?.number ?? page;
  const hasPreviousPage = slice ? !slice.first : page > 0;
  const hasNextPage = slice?.last === false;

  const activeQuery = isSearching ? userSearch : userList;
  const users = (isSearching ? userSearch.data?.content : slice?.content) ?? [];
  let listStatus: ReactNode = null;
  if (activeQuery.isPending || (!isSearching && userList.isPlaceholderData)) {
    listStatus = (
      <Loading role="status">
        {isSearching ? '회원을 검색하는 중입니다.' : '회원 목록을 불러오는 중입니다.'}
      </Loading>
    );
  } else if (activeQuery.isError) {
    listStatus = (
      <LoadErrorView
        title={isSearching ? '회원 검색에 실패했습니다.' : '회원 목록을 불러오지 못했습니다.'}
        onRetry={() => void activeQuery.refetch()}
      />
    );
  }

  return (
    <Container>
      <Header>
        <PageTitle>회원 목록 조회</PageTitle>
        {!isSearching && (page > 0 || hasNextPage) && (
          <Pagination aria-label="회원 목록 페이지">
            <PageButton type="button" disabled={!hasPreviousPage} onClick={() => setPage(pageNumber - 1)}>
              이전 페이지
            </PageButton>
            <span aria-live="polite">{pageNumber + 1} 페이지</span>
            <PageButton type="button" disabled={!hasNextPage} onClick={() => setPage(pageNumber + 1)}>
              다음 페이지
            </PageButton>
          </Pagination>
        )}
      </Header>
      <UserListWithSearch
        searchName={searchName}
        onSearchChange={setSearchName}
        users={users}
        totalCount={userList.data?.totalCount}
        resultCount={isSearching ? userSearch.data?.totalCount ?? 0 : users.length}
        listStatus={listStatus}
      />
    </Container>
  );
};

export default UserInformation;

const Container = styled.section`
  --user-list-count-color: ${({ theme }) => adminTokens(theme).colors.black};
  width: 100%;
  min-width: 0;
`;

const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${ColorData.spacing[16]};
  width: min(100%, 80rem);
  margin: 0 auto ${ColorData.spacing[32]};
`;

const Pagination = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${ColorData.spacing[8]};
  color: ${({ theme }) => adminTokens(theme).colors.black};
`;

const PageButton = styled.button`
  min-height: 2.75rem;
  padding: 0 ${ColorData.spacing[12]};
  border: 1px solid ${({ theme }) => adminTokens(theme).colors.primaryDark};
  border-radius: ${({ theme }) => adminTokens(theme).components.fieldRadius};
  background: ${({ theme }) => adminTokens(theme).colors.white};
  color: ${({ theme }) => adminTokens(theme).colors.text};
  font: inherit;
  cursor: pointer;

  &:enabled:hover {
    background: ${({ theme }) => adminTokens(theme).colors.primaryLight};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => adminTokens(theme).colors.black};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const Loading = styled.p`
  text-align: center;
`;
