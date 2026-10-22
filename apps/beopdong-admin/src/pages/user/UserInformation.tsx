import styled from '@emotion/styled';
import { UserListWithSearch } from '@widgets/user';
import { previewUsers } from './model/previewUsers';

const UserInformation = () => {
  return (
    <Container>
      <Title id="admin-page-title" tabIndex={-1}>회원 목록 조회</Title>
      <UserListWithSearch users={previewUsers} />
    </Container>
  );
};

export default UserInformation;

const Container = styled.section`
  width: 100%;
  min-width: 0;
`;

const Title = styled.h1`
  width: min(100%, 80rem);
  margin: 0 auto 2rem;
  font-size: 2rem;
  line-height: 1.4;
  overflow-wrap: anywhere;
`;
