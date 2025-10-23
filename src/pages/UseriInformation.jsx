import styled from '@emotion/styled';
import { useState, useMemo } from 'react';
import UseBackground from '../components/Background/UseBackground';
import Header from '../components/Form/Header';
import UserFilter from '../components/Form/UserFilter';
import UserInformationCard from '../components/Form/UserInformationCard';
import { useUserList } from '../hooks/userList';

const UserInformation = () => {
  const [filters, setFilters] = useState({
    residence: null,
    page: 0,
  });

  const { data, isLoading, isError, error } = useUserList(filters);
  const { residence } = filters;
  const displayUsers = useMemo(() => {
    if (!data) return [];
    if (data?.users && Array.isArray(data.users)) {
      return data.users;
    }

    const userContent = data?.slice?.content;
    if (userContent && Array.isArray(userContent)) {
      return userContent;
    }
    if (Array.isArray(data)) {
      return data;
    }

    return [];
  }, [data]);

  const totalUsersCount = useMemo(() => {
    if (!data) return 0;

    if (typeof data.totalCount === 'number') {
      return data.totalCount;
    }
    if (typeof data.totalElements === 'number') {
      return data.totalElements;
    }

    return displayUsers.length;
  }, [data, displayUsers.length]);

  if (isLoading) {
    return (
      <>
        <Header title="회원 목록 조회" />
        <p style={{ textAlign: 'center', marginTop: '20vh' }}>
          데이터를 불러오는 중...
        </p>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Header title="회원 목록 조회" />
        <p style={{ textAlign: 'center', marginTop: '20vh', color: 'red' }}>
          회원 목록을 불러오는 데 실패했습니다:{' '}
          {error?.message || '알 수 없는 오류'}
        </p>
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
            selectedLocation={residence === null ? '전체 지역' : residence}
            setSelectedLocation={(location) => {
              setFilters((prev) => ({
                ...prev,
                residence: location === '전체 지역' ? null : location,
                page: 0,
              }));
            }}
          />
        </FilterWrapper>

        {displayUsers.map((user) => (
          <UserInformationCard
            key={user.id}
            location={user.residence}
            name={user.name}
            gender={user.gender}
            birthday={user.birthYMD}
            phonNumber={user.phone}
          />
        ))}

        {displayUsers.length === 0 && (
          <p style={{ textAlign: 'center', marginTop: '50px', color: '#888' }}>
            {residence === null
              ? '등록된 회원이 없습니다.'
              : `${residence}에 등록된 회원이 없습니다.`}
          </p>
        )}
      </ContentWrapper>
    </Container>
  );
};

export default UserInformation;
const Container = styled.div`
  padding-top: 12.04vh;
`;

const HeaderHeight = '12.04vh';

const ContentWrapper = styled.div`
  min-height: calc(100vh - ${HeaderHeight});
`;

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0 10px 0;
`;

const TotalCountText = styled.p`
  color: #ffffff;
  font-size: 20px;
  margin: 0;
  margin-left: 12.5%;
  position: relative;
  z-index: 10;
  white-space: nowrap;
`;
