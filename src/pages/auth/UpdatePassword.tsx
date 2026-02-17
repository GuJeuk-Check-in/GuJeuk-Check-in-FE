import { PasswordBackground } from '@shared/ui/Background/index';
import { RightLayout } from '@widgets/authLayout/index';
import styled from '@emotion/styled';
import { UpdatePasswordForm } from '@features/auth/update-password/ui/UpdatePasswordForm';

const UpdatePassword = () => {
  return (
    <>
      <PasswordBackground />
      <MainWrapper>
        <RightLayout title="관리자 비밀번호 변경" backgroundColor="#0F50A0" color="#FFFFFF" spacer={40}>
          <UpdatePasswordForm />
        </RightLayout>
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
