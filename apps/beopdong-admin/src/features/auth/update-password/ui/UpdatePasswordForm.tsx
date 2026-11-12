import { useNavigate } from 'react-router-dom';
import { UpdatePasswordForm as SharedUpdatePasswordForm } from '@center/ui/auth';
import { useModal } from '@center/ui/modal';
import { tokenStorage } from '@entities/auth';
import { useUpdatePassword } from '../model/useUpdatePassword';

export const UpdatePasswordForm = () => {
  const navigate = useNavigate();
  const modal = useModal();
  const { updatePassword, isPending } = useUpdatePassword();

  return (
    <SharedUpdatePasswordForm
      modal={modal}
      failureDisplay="inline"
      isPending={isPending}
      onUpdatePassword={(values, callbacks) => {
        void updatePassword(values, callbacks);
      }}
      onLogin={() => {
        tokenStorage.clear();
        navigate('/organ/login', { replace: true });
      }}
    />
  );
};
