import styled from '@emotion/styled';
import { PasswordBackground } from '@shared/ui/Background/index';
import { RightLayout } from '@widgets/authLayout/index';
import { LoginForm } from '@features/auth/login/ui/LoginForm';
import { useEffect } from 'react';
import { useAuthStore } from '@entities/auth';

const EnterPassword = () => {
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <>
      <PasswordBackground />
      <MainWrapper>
        <RightLayout title="관리자 로그인" spacer={70}>
          <LoginForm />
        </RightLayout>
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
