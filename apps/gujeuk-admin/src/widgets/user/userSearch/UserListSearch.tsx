import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { UserListLayout } from '@center/ui/search';
import { UserFilter } from '@widgets/user/userFilter';
import { UserInformationCard } from '@entities/user';
import {
  useSearchUser,
  useInfiniteUserList,
} from '@features/user/index';
import { useResidenceList } from '@entities/residence';

interface UserListWithSearchProps {
  totalCountText?: string;
}

export const UserListWithSearch = ({
  totalCountText = '총',
}: UserListWithSearchProps) => {
  useResidenceList();
  const [filters, setFilters] = useState<{ residence: string | null }>({
    residence: null,
  });

  const observerTarget = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteUserList({ residence: filters.residence });

  const allUsers = data?.pages.flatMap((page) => page.users) ?? [];
  const totalUsersCount = data?.pages[0]?.totalCount ?? 0;

  const {
    searchName,
    filteredUsers,
    handleSearchChange,
    handleClearSearch,
    resultCount,
  } = useSearchUser(allUsers, {
    residence: null,
    searchName: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <LoadingOverlay>
        <LoadingBox>
          <p>데이터를 불러오는 중</p>
          <p>잠시만 기다려주세요...</p>
        </LoadingBox>
      </LoadingOverlay>
    );
  }

  if (isError) {
    return (
      <ErrorText>
        회원 목록을 불러오는 데 실패했습니다:{' '}
        {error instanceof Error ? error.message : '알 수 없는 오류'}
      </ErrorText>
    );
  }

  return (
    <UserListLayout
      totalCount={totalUsersCount}
      totalCountText={totalCountText}
      searchName={searchName}
      resultCount={resultCount}
      onSearchChange={handleSearchChange}
      onClearSearch={handleClearSearch}
      filter={
        <UserFilter
          selectedLocation={filters.residence ?? '전체 지역'}
          setSelectedLocation={(location) =>
            setFilters({ residence: location === '전체 지역' ? null : location })
          }
        />
      }
      emptyText={
        searchName
          ? `"${searchName}"에 해당하는 회원이 없습니다.`
          : filters.residence
          ? `${filters.residence}에 등록된 회원이 없습니다.`
          : '등록된 회원이 없습니다.'
      }
      afterList={
        <>
          <div ref={observerTarget} style={{ height: '20px', margin: '10px 0' }} />
          {isFetchingNextPage && <InfoMessage>다음 페이지를 로딩 중...</InfoMessage>}
        </>
      }
    >
      {filteredUsers.map((user) => (
        <UserInformationCard
          key={user.id}
          id={user.id}
          location={user.residence}
          name={user.name}
          gender={user.gender}
          birthday={user.birthYMD}
          phonNumber={user.phone}
          count={user.count}
        />
      ))}
    </UserListLayout>
  );
};

const LoadingOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingBox = styled.div`
  background: rgba(255, 255, 255, 0.3);
  padding: 30px 50px;
  border-radius: 10px;
  color: #fff;
`;

const ErrorText = styled.p`
  margin-top: 20vh;
  text-align: center;
  color: red;
`;

const InfoMessage = styled.p`
  grid-column: 1 / -1;
  text-align: center;
  color: #ffffff;
  padding: 20px 0;
`;
