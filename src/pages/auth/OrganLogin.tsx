import styled from '@emotion/styled';
import { PasswordBackground } from '@shared/ui/Background/index';
import { RightLayout } from '@widgets/auth/index';
import { LoginForm } from '@features/auth/login/ui/LoginForm';
import { useEffect } from 'react';
import { useAuthStore } from '@entities/auth';

const OrganLogin = () => {
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

export default OrganLogin;

const MainWrapper = styled.div`
  min-height: 100dvh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
