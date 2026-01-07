import styled from '@emotion/styled';
import { useState } from 'react';
import UseBackground from '../components/Background/UseBackground';
import Header from '../components/Form/Header';
import UserFilter from '../components/Form/UserFilter';
import UserInformationCard from '../components/Form/UserInformationCard';
import { useUserList } from '../api/user/hooks/userList';

const UserInformation = () => {
  const [filters, setFilters] = useState<{
    residence: string | null;
    page: number;
  }>({
    residence: null,
    page: 0,
  });

  const { data, isLoading, isError, error } = useUserList(filters);

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

  const users = data?.users || data?.slice?.content || [];
  const totalUsersCount = data?.totalCount || 0;

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
                page: 0,
              })
            }
          />
        </FilterWrapper>

        {users.map((user) => (
          <UserInformationCard
            key={user.id}
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
