import { AuthPageLayout } from '@widgets/GlobalLayout';
import { LoginForm, useLoginPage } from '@features/auth/login';

const OrganLogin = () => {
  useLoginPage();

  return (
    <AuthPageLayout title="관리자 로그인" spacer={70}>
      <LoginForm />
    </AuthPageLayout>
  );
};

export default OrganLogin;
