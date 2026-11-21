import { useState } from 'react';
import styled from '@emotion/styled';
import { adminTokens, ColorData } from '@center/tokens';
import { LoadErrorView } from '@center/ui/feedback';
import { useUserList } from '@entities/user';
import { UserListWithSearch } from '@widgets/user';
import { PageTitle } from '@shared/ui';

const UserInformation = () => {
  const [page, setPage] = useState(0);
  const { data, isPending, isError, refetch } = useUserList(page);
  const pageNumber = data?.number ?? page;
  const hasPreviousPage = data ? !data.first : page > 0;
  const hasNextPage = data?.last === false;

  return (
    <Container>
      <Header>
        <PageTitle>회원 목록 조회</PageTitle>
        {(page > 0 || hasNextPage) && (
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
      {isPending && <Loading role="status">회원 목록을 불러오는 중입니다.</Loading>}
      {isError && (
        <LoadErrorView title="회원 목록을 불러오지 못했습니다." onRetry={() => void refetch()} />
      )}
      {!isError && data && <UserListWithSearch key={pageNumber} users={data.content} />}
    </Container>
  );
};

export default UserInformation;

const Container = styled.section`
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
