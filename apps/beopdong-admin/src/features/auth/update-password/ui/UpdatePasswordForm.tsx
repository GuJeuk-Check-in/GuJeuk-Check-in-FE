import { useNavigate } from 'react-router-dom';
import { UpdatePasswordForm as SharedUpdatePasswordForm } from '@center/ui/auth';
import { useModal } from '@center/ui/modal';

export const UpdatePasswordForm = () => {
  const navigate = useNavigate();
  const modal = useModal();

  return (
    <SharedUpdatePasswordForm
      modal={modal}
      failureDisplay="inline"
      onUpdatePassword={(_values, callbacks) => callbacks.onError(
        '법동 관리자 비밀번호 변경 API 연결이 아직 준비되지 않았습니다.'
      )}
      onLogin={() => navigate('/organ/login', { replace: true })}
    />
  );
};
