import { AuthPageLayout } from '@widgets/GlobalLayout';
import { UpdatePasswordForm } from '@features/auth/update-password/ui/UpdatePasswordForm';

const OrganChange = () => {
  return (
    <AuthPageLayout title="관리자 비밀번호 변경" spacer={40}>
      <UpdatePasswordForm />
    </AuthPageLayout>
  );
};

export default OrganChange;
