import styled from '@emotion/styled';
import { UseBackground } from '@shared/ui/Background/index';
import { Header } from '@widgets/GlobalLayout/index';
import { UserListWithSearch } from '@widgets/user/userSearch/UserListSearch';

const UserInformation = () => {
  return (
    <Container>
      <UseBackground />
      <Header />
      <ContentWrapper>
        <UserListWithSearch totalCountText="총" />
      </ContentWrapper>
    </Container>
  );
};

export default UserInformation;

const Container = styled.div`
  flex: 1;
  box-sizing: border-box;
  display: flex;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 3.5rem 3.75rem;
  gap: 1.25rem;
  box-sizing: border-box;
`;
