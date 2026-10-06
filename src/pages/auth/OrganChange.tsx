import { AuthPageLayout } from '@widgets/auth';
import { UpdatePasswordForm } from '@features/auth/update-password/ui/UpdatePasswordForm';

const OrganChange = () => {
  return (
    // 비밀번호 변경 페이지 레이아웃 컴포넌트
    <AuthPageLayout title="관리자 비밀번호 변경" spacer={40}>
      {/* 비밀번호 변경 폼 컴포넌트 */}
      <UpdatePasswordForm />
    </AuthPageLayout>
  );
};

export default OrganChange;
