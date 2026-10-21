import { useNavigate } from 'react-router-dom';
import { UpdatePasswordForm as SharedUpdatePasswordForm } from '@center/ui/auth';
import { useUpdatePassword } from '../model/useUpdatePassword';
import { useAuthStore } from '@entities/auth';
import { useModal } from '@shared/hooks';

export const UpdatePasswordForm = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { mutate: updatePassword, isPending } = useUpdatePassword();
  const modal = useModal();

  return (
    <SharedUpdatePasswordForm
      modal={modal}
      isPending={isPending}
      onUpdatePassword={(values, callbacks) => updatePassword(values, {
        onSuccess: callbacks.onSuccess,
        onError: (error) => callbacks.onError(
          error.response?.data?.message || '비밀번호 변경 중 오류가 발생했습니다.'
        ),
      })}
      onLogin={() => {
        logout();
        navigate('/organ/login', { replace: true });
      }}
    />
  );
};
