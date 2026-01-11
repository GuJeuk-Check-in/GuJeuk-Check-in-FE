import styled from '@emotion/styled';
import PasswordBackground from '@shared/ui/Background/PasswordBackground';
import LeftPage from '@shared/ui/Form/LeftPage';
import RightPage from '@shared/ui/Form/RightPage';
import { LoginForm } from '@features/auth/login/ui/LoginForm';

const EnterPassword = () => {
  return (
    <>
      <PasswordBackground />
      <MainWrapper>
        <PageContainer>
          <LeftPage />

          <RightPage title="관리자 비밀번호 입력">
            <LoginForm />
          </RightPage>
        </PageContainer>
      </MainWrapper>
    </>
  );
};

export default EnterPassword;

const MainWrapper = styled.div`
  min-height: 100dvh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;
