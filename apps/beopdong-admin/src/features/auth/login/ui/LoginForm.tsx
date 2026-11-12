import { useNavigate } from 'react-router-dom';
import { LoginForm as SharedLoginForm } from '@center/ui/auth';
import { useLogin } from '../model/useLogin';

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login, isPending } = useLogin();

  return (
    <SharedLoginForm
      isPending={isPending}
      onLogin={(values, callbacks) => {
        void login(values, callbacks);
      }}
      onSuccess={() => navigate('/log', { replace: true })}
      onChangePassword={() => navigate('/organ/change')}
    />
  );
};
