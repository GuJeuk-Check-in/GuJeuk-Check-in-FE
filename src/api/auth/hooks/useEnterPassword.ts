import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { enterPassword } from '../api';
import useAuthStore from '../../../store/authStore';
import { EnterPasswordResponse } from '../types';

interface UseEnterPasswordParams {
  setErrorMessage: (message: string) => void;
}

const useEnterPassword = ({ setErrorMessage }: UseEnterPasswordParams) => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation<
    EnterPasswordResponse,
    AxiosError<{ message?: string }>,
    { password: string }
  >({
    mutationFn: enterPassword,

    onSuccess: ({ accessToken, refreshToken }) => {
      if (!accessToken || !refreshToken) {
        setErrorMessage('로그인 응답이 올바르지 않습니다.');
        return;
      }

      setAuth(accessToken, refreshToken);
      setErrorMessage('');
      navigate('/log', { replace: true });
    },

    onError: (error) => {
      const message =
        error.response?.data?.message ??
        error.message ??
        '로그인 처리 중 문제가 발생했습니다.';

      setErrorMessage(message);
    },
  });
};

export default useEnterPassword;
