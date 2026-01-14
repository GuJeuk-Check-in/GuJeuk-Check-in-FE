import styled from '@emotion/styled';
import { useState, useRef, useEffect } from 'react';
import UseBackground from '@shared/ui/Background/UseBackground';
import Header from '@widgets/layout/header/Header';
import UserFilter from '@shared/ui/Form/UserFilter';
import UserInformationCard from '@shared/ui/Form/UserInformationCard';
import { useInfiniteUserList } from '../api/user/hooks/userList';

const UserInformation = () => {
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

  const users = data?.pages.flatMap((page) => page.users) ?? [];
  const totalUsersCount = data?.pages[0]?.totalCount ?? 0;

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
      <>
        <Header title="회원 목록 조회" />
        <LoadingOverlay>
          <LoadingBox>
            <p>데이터를 불러오는 중</p>
            <p>잠시만 기다려주세요...</p>
          </LoadingBox>
        </LoadingOverlay>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Header title="회원 목록 조회" />
        <ErrorText>
          회원 목록을 불러오는 데 실패했습니다:{' '}
          {error instanceof Error ? error.message : '알 수 없는 오류'}
        </ErrorText>
      </>
    );
  }

  return (
    <Container>
      <UseBackground />
      <Header title="회원 목록 조회" />

      <ContentWrapper>
        <FilterWrapper>
          <TotalCountText>총 {totalUsersCount} 명</TotalCountText>

          <UserFilter
            selectedLocation={filters.residence ?? '전체 지역'}
            setSelectedLocation={(location) =>
              setFilters({
                residence: location === '전체 지역' ? null : location,
              })
            }
          />
        </FilterWrapper>

        {users.map((user) => (
          <UserInformationCard
            key={`${user.id}-${user.residence}`}
            location={user.residence}
            name={user.name}
            gender={user.gender}
            birthday={user.birthYMD}
            phonNumber={user.phone}
            count={user.count}
          />
        ))}

        {users.length === 0 && (
          <EmptyText>
            {filters.residence
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
      </ContentWrapper>
    </Container>
  );
};

export default UserInformation;

const Container = styled.div`
  padding-top: 12.04vh;
`;

const ContentWrapper = styled.div`
  min-height: calc(100vh - 12.04vh);
  padding-bottom: 50px;
`;

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0 10px 0;
`;

const TotalCountText = styled.p`
  width: 200px;
  color: #ffffff;
  font-size: 20px;
  margin-left: 12.5%;
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
  margin-top: 50px;
  text-align: center;
  color: #888;
`;

const InfoMessage = styled.p`
  text-align: center;
  color: #ffffff;
  padding: 20px 0;
  font-size: 16px;
  opacity: 0.8;
  animation: blink 1.5s infinite;
`;
