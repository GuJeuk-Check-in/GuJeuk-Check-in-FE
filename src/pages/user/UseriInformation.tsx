import styled from '@emotion/styled';
import UseBackground from '@shared/ui/Background/UseBackground';
import Header from '@widgets/layout/header/Header';
import { UserListWithSearch } from '@widgets/user/userSearch/UserListSearch';

const UserInformation = () => {
  return (
    <Container>
      <UseBackground />
      <Header title="회원 목록 조회" />
      <ContentWrapper>
        <UserListWithSearch totalCountText="총" />
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
