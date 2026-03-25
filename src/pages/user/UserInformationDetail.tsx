import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { Header } from '@widgets/GlobalLayout/index';
import { UseBackground } from '@shared/ui/Background/index';
import { useUserDetail } from '@features/user';
import { UserInformationDetailActions } from '@features/user';

const UserInformationDetail = () => {
  const { userId: userIdParam } = useParams<{ userId: string }>();
  const { userData, isLoading, isError, error, refetch, isNotFound } =
    useUserDetail(userIdParam);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingText>사용자 정보를 불러오는 중...</LoadingText>;
    }

    if (isError) {
      return (
        <ErrorText>
          사용자 정보 조회에 실패했습니다:
          {error?.message || '알 수 없는 오류가 발생했습니다.'}
        </ErrorText>
      );
    }

    if (isNotFound) {
      return <LoadingText>사용자 정보를 찾을 수 없습니다.</LoadingText>;
    }

    return (
      <UserInformationDetailActions
        userData={userData!}
        refetchUserInformation={refetch}
      />
    );
  };

  return (
    <Container>
      <UseBackground />
      <Header />
      <Wrapper>{renderContent()}</Wrapper>
    </Container>
  );
};

export default UserInformationDetail;

const Container = styled.div`
  flex: 1;
  box-sizing: border-box;
  display: flex;
  max-height: 100vh;
  overflow-y: hidden;
`;

const Wrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100dvh;
  overflow-y: scroll;
`;

const LoadingText = styled.p`
  text-align: center;
  margin: 3.125rem 0;
  color: #777;
  font-size: 1.1rem;
`;

const ErrorText = styled(LoadingText)`
  color: #ff5a5a;
  font-weight: bold;
`;
