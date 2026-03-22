import styled from '@emotion/styled';
import { UseBackground } from '@shared/ui/Background/index';
import { Header } from '@widgets/GlobalLayout/index';
import { UserVisitListFeature } from '@features/visit';

const UserVisitList = () => {
  return (
    <Container>
      <UseBackground />
      <Header />
      <ContentWrapper>
        <UserVisitListFeature />
      </ContentWrapper>
    </Container>
  );
};

export default UserVisitList;

const Container = styled.div`
  flex: 1;
  box-sizing: border-box;
  display: flex;
  max-height: 100vh;
  overflow-y: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 3.5rem 3.75rem;
  gap: 1.25rem;
  box-sizing: border-box;
  overflow-y: scroll;
`;
