import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { UpdatePasswordResponse, UpdatePasswordRequest } from '../types';
import useAuthStore from '../../../store/authStore';
import { updatePassword } from '../api';

interface UseUpdatePasswordParams {
  setErrorMessage: (message: string) => void;
}

const useUpdatePassword = ({ setErrorMessage }: UseUpdatePasswordParams) => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  return useMutation<
    UpdatePasswordResponse,
    AxiosError<{ message?: string }>,
    UpdatePasswordRequest
  >({
    mutationFn: updatePassword,

    onSuccess: () => {
      setErrorMessage('');
      alert('비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.');
      logout();
      navigate('/admin/login', { replace: true });
    },

    onError: (error) => {
      const message =
        error.response?.data?.message ??
        error.message ??
        '비밀번호 변경 중 오류가 발생했습니다.';

      setErrorMessage(message);
    },
  });
};

export default useUpdatePassword;
