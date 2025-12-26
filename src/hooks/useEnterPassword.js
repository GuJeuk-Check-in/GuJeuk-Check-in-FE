import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { EnterPassword } from '../api/authApi';
import useAuthStore from '../store/authStore';

const useEnterPassword = (setErrorMessage) => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: EnterPassword,

    onSuccess: (response) => {
      const accessToken = response?.accessToken;
      const refreshToken = response?.refreshToken;

      if (
        !accessToken ||
        accessToken === 'undefined' ||
        accessToken === 'null'
      ) {
        setErrorMessage('로그인 응답에서 accessToken을 찾을 수 없습니다.');
        return;
      }

      if (
        !refreshToken ||
        refreshToken === 'undefined' ||
        refreshToken === 'null'
      ) {
        setErrorMessage('로그인 응답에서 refreshToken을 찾을 수 없습니다.');
        return;
      }

      setAuth(accessToken, refreshToken);
      setErrorMessage('');
      navigate('/admin/list/all', { replace: true });
    },

    onError: (error) => {
      const message = error.message || error.response?.data?.message;

      if (message) {
        setErrorMessage(message);
      } else {
        setErrorMessage('로그인 처리 중 문제가 발생했습니다.');
      }
    },
  });
};

export default useEnterPassword;
