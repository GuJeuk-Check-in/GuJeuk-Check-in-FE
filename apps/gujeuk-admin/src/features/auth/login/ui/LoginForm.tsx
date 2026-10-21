import { useNavigate } from 'react-router-dom';
import { LoginForm as SharedLoginForm } from '@center/ui/auth';
import { useLogin } from '../model/useLogin';

export const LoginForm = () => {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();

  return (
    <SharedLoginForm
      isPending={isPending}
      onLogin={(values, callbacks) => login(values, {
        onSuccess: callbacks.onSuccess,
        onError: (error) => callbacks.onError(
          error.response?.data?.message || error.message || '로그인 실패'
        ),
      })}
      onSuccess={() => navigate('/log', { replace: true })}
      onChangePassword={() => navigate('/organ/change')}
    />
  );
};
