import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { Header } from '@widgets/GlobalLayout/index';
import { UseBackground } from '@shared/ui/Background/index';
import { useFetchUserInformation } from '../../entities/user/model/useFetchUser';
import { UserInformationDetailActions } from '@features/user/user-update/ui/UserInformationDetailActions';
import type { UserInformation } from '@entities/user';

const UserInformationDetail = () => {
  const { userId: userIdParam } = useParams<{ userId: string }>();

  const {
    data: userInfo,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchUserInformation(userIdParam);

  const userData = useMemo<UserInformation | null>(() => {
    if (!userInfo) {
      return null;
    }

    return {
      id: userInfo.id || parseInt(userIdParam || '0', 10),
      name: userInfo.name || '',
      userId: userInfo.userId || '',
      phone: userInfo.phone || '',
      gender: userInfo.gender || 'MALE',
      birthYMD: userInfo.birthYMD || '',
      residence: userInfo.residence || '',
      privacyAgreed: userInfo.privacyAgreed || false,
    };
  }, [userInfo, userIdParam]);

  if (isLoading) {
    return (
      <Container>
        <UseBackground />
        <Header />
        <Wrapper>
          <LoadingText>사용자 정보를 불러오는 중...</LoadingText>
        </Wrapper>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <UseBackground />
        <Header />
        <Wrapper>
          <ErrorText>
            사용자 정보 조회에 실패했습니다:
            {error?.message || '알 수 없는 오류가 발생했습니다.'}
          </ErrorText>
        </Wrapper>
      </Container>
    );
  }

  if (!userData) {
    return (
      <Container>
        <UseBackground />
        <Header />
        <Wrapper>
          <LoadingText>사용자 정보를 찾을 수 없습니다.</LoadingText>
        </Wrapper>
      </Container>
    );
  }

  return (
    <Container>
      <UseBackground />
      <Header />
      <Wrapper>
        <UserInformationDetailActions
          userData={userData}
          refetchUserInformation={refetch}
        />
      </Wrapper>
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
