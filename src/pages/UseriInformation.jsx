import styled from '@emotion/styled';
import { useState, useEffect, useMemo } from 'react';
import UseBackground from '../components/Background/UseBackground';
import Header from '../components/Form/Header';
import UserFilter from '../components/Form/UserFilter';
import UserInformationCard from '../components/Form/UserInformationCard';
import { GoContainer } from 'react-icons/go';

const DUMMY_USERS = [
  {
    id: 1,
    location: '구즉동',
    name: '오혜민',
    gender: '여성',
    birthday: '2009/11/13',
    phoneNumber: '010-1234-5678',
  },
  {
    id: 2,
    location: '노은1동',
    name: '김철수',
    gender: '남성',
    birthday: '1995/05/20',
    phoneNumber: '010-9876-5432',
  },
  {
    id: 3,
    location: '관평동',
    name: '이사라',
    gender: '여성',
    birthday: '2000/01/01',
    phoneNumber: '010-1111-2222',
  },
  {
    id: 4,
    location: '구즉동',
    name: '박영희',
    gender: '여성',
    birthday: '1998/08/15',
    phoneNumber: '010-4444-5555',
  },
  {
    id: 5,
    location: '상대동',
    name: '정민준',
    gender: '남성',
    birthday: '2005/03/10',
    phoneNumber: '010-6666-7777',
  },
];

const UserInformation = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState('전체 지역');

  useEffect(() => {
    // 실제 API 호출로직
    const fetchUsers = () => {
      setTimeout(() => {
        setUsers(DUMMY_USERS);
        setIsLoading(false);
      }, 200);
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    if (selectedLocation === '전체 지역') {
      return users;
    }
    return users.filter((user) => user.location === selectedLocation);
  }, [users, selectedLocation]);

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

  return (
    <Container>
      <UseBackground />
      <Header title="회원 목록 조회" />
      <ContentWrapper>
        <UserFilter
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />

        {filteredUsers.map((user) => (
          <UserInformationCard
            key={user.id}
            location={user.location}
            name={user.name}
            gender={user.gender}
            birthday={user.birthday}
            phonNumber={user.phoneNumber}
          />
        ))}

        {filteredUsers.length === 0 && (
          <p style={{ textAlign: 'center', marginTop: '50px' }}>
            {selectedLocation}에 등록된 회원이 없습니다.
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
