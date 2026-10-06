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

// 거주지 필터 + 검색 + 무한스크롤이 결합된 회원 목록 위젯
export const UserListWithSearch = ({
  totalCountText = '총',
}: UserListWithSearchProps) => {
  useResidenceList();
  // 선택된 거주지 필터
  const [filters, setFilters] = useState<{ residence: string | null }>({
    residence: null,
  });

  // 무한스크롤 트리거 감지용 엘리먼트
  const observerTarget = useRef<HTMLDivElement>(null);

  // 거주지 필터가 적용된 회원 목록을 페이지 단위로 조회
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteUserList({ residence: filters.residence });

  // 페이지별로 나뉜 회원 데이터를 하나의 배열로 합침
  const allUsers = data?.pages.flatMap((page) => page.users) ?? [];
  const totalUsersCount = data?.pages[0]?.totalCount ?? 0;

  // 조회된 회원 목록에서 이름 검색(한글 초성 포함) 적용
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

  // 스크롤이 하단 트리거에 도달하면 다음 페이지 요청
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

  // 로딩 중에는 목록 대신 로딩 오버레이 표시
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

  // 조회 실패 시 에러 메시지 표시
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
        {/* 필터/검색 결과가 있으면 카드 목록, 없으면 상황별 안내 문구 표시 */}
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
