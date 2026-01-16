import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import UserFilter from '@shared/ui/Form/UserFilter';
import UserInformationCard from '@shared/ui/Form/UserInformationCard';
import {
  UserSearchBar,
  useSearchUser,
  useInfiniteUserList,
} from '@features/user/index';

interface UserListWithSearchProps {
  totalCountText?: string;
}

export const UserListWithSearch = ({
  totalCountText = '총',
}: UserListWithSearchProps) => {
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
    residence: filters.residence,
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
    <Wrapper>
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
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 75%;
  margin: 0 auto;
  padding: 40px 0;
  min-width: 800px;
`;

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  width: 100%;
`;

const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const InfoSection = styled.div``;
const ControlSection = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const TotalCountText = styled.p`
  color: #ffffff;
  font-size: 20px;
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
  color: #888;
  padding: 50px 0;
`;

const InfoMessage = styled.p`
  grid-column: 1 / -1;
  text-align: center;
  color: #ffffff;
  padding: 20px 0;
`;
