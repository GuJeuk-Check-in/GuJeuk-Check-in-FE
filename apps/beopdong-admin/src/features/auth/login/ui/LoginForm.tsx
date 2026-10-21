import { useNavigate } from 'react-router-dom';
import { LoginForm as SharedLoginForm } from '@center/ui/auth';

export const LoginForm = () => {
  const navigate = useNavigate();

  return (
    <SharedLoginForm
      onLogin={(_values, callbacks) => callbacks.onError(
        '법동 관리자 로그인 API 연결이 아직 준비되지 않았습니다.'
      )}
      onSuccess={() => navigate('/log', { replace: true })}
      onChangePassword={() => navigate('/organ/change')}
    />
  );
};
