import { AuthPageLayout } from '@widgets/auth';
import { LoginForm, useLoginPage } from '@features/auth/login';

const OrganLogin = () => {
  useLoginPage();

  return (
    // 로그인 페이지 레이아웃 컴포넌트
    <AuthPageLayout title="관리자 로그인" spacer={70}>
      {/* 로그인 폼 컴포넌트 */}
      <LoginForm />
    </AuthPageLayout>
  );
};

export default OrganLogin;
