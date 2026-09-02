import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { UserFilter } from '@widgets/user/userFilter';
import { UserInformationCard } from '@entities/user';
import {
  UserSearchBar,
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
    <ContentWrapper>
      <FilterWrapper>
        <InfoSection>
          <TotalCountText>
            {totalCountText} {totalUsersCount} 명
            {searchName && ` (검색 결과: ${resultCount}명)`}
          </TotalCountText>
        </InfoSection>

        <ControlSection>
          <UserSearchBar
            value={searchName}
            onChange={handleSearchChange}
            onClear={handleClearSearch}
          />

          <UserFilter
            selectedLocation={filters.residence ?? '전체 지역'}
            setSelectedLocation={(location) =>
              setFilters({
                residence: location === '전체 지역' ? null : location,
              })
            }
          />
        </ControlSection>
      </FilterWrapper>

      <UserListContainer>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
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
          ))
        ) : (
          <EmptyText>
            {searchName
              ? `"${searchName}"에 해당하는 회원이 없습니다.`
              : filters.residence
              ? `${filters.residence}에 등록된 회원이 없습니다.`
              : '등록된 회원이 없습니다.'}
          </EmptyText>
        )}

        <div
          ref={observerTarget}
          style={{ height: '20px', margin: '10px 0' }}
        />

        {isFetchingNextPage && (
          <InfoMessage>다음 페이지를 로딩 중...</InfoMessage>
        )}
      </UserListContainer>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  gap: 36px;
`;

const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  width: min(100%, 80rem);
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 64rem) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const InfoSection = styled.div`
  min-width: 0;
`;

const ControlSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  width: min(100%, 26rem);
  min-width: 0;
  margin-left: auto;

  > *:first-of-type {
    flex: 0 1 15rem;
  }

  > *:last-of-type {
    flex: 0 0 10rem;
  }

  @media (max-width: 64rem) {
    width: 100%;
    margin-left: 0;
  }

  @media (max-width: 40rem) {
    flex-direction: column;
    align-items: stretch;

    > * {
      flex: 1 1 auto;
      width: 100%;
    }
  }
`;

const TotalCountText = styled.p`
  color: #ffffff;
  font-size: 24px;
  margin: 0;
`;

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

const EmptyText = styled.p`
  grid-column: 1 / -1;
  text-align: center;
  color: #eee;
  padding: 50px 0;
  font-size: 1.1rem;
`;

const InfoMessage = styled.p`
  grid-column: 1 / -1;
  text-align: center;
  color: #ffffff;
  padding: 20px 0;
`;
