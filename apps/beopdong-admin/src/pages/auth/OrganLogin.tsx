import { AuthPageLayout } from '@widgets/auth';
import { LoginForm } from '@features/auth/login';

export const OrganLogin = () => {
  return (
    <AuthPageLayout title="관리자 로그인" spacer={70}>
      <LoginForm />
    </AuthPageLayout>
  );
};
