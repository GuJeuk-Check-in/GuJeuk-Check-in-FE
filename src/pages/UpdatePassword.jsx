import PasswordBackground from '../components/Background/PasswordBackground';
import LeftPage from '../components/Form/LeftPage';
import RightPage from '../components/Form/RightPage';
import styled from '@emotion/styled';
import { UpdatePasswordForm } from '@features/auth/update-password/ui/UpdatePasswordForm';

const UpdatePassword = () => {
  return (
    <>
      <PasswordBackground />
      <MainWrapper>
        <LeftPage />
        <RightPage title="관리자 비밀번호 변경">
          <UpdatePasswordForm />
        </RightPage>
      </MainWrapper>
    </>
  );
};

export default UpdatePassword;

const MainWrapper = styled.div`
  min-height: 100dvh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
