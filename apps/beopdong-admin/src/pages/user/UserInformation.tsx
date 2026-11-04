import styled from '@emotion/styled';
import { UserListWithSearch } from '@widgets/user';
import { PageTitle } from '@shared/ui';
import { previewUsers } from './model/previewUsers';

const UserInformation = () => {
  return (
    <Container>
      <Title>회원 목록 조회</Title>
      <UserListWithSearch users={previewUsers} />
    </Container>
  );
};

export default UserInformation;

const Container = styled.section`
  width: 100%;
  min-width: 0;
`;

const Title = styled(PageTitle)`
  width: min(100%, 80rem);
  margin: 0 auto 2rem;
`;
