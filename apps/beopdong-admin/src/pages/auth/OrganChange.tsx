import { AuthPageLayout } from '@widgets/auth';
import { UpdatePasswordForm } from '@features/auth/update-password/ui/UpdatePasswordForm';

export const OrganChange = () => {
  return (
    <AuthPageLayout title="관리자 비밀번호 변경" spacer={40}>
      <UpdatePasswordForm />
    </AuthPageLayout>
  );
};
