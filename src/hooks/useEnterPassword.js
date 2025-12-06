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
      const rawToken =
        response.headers['authorization'] || response.headers['Authorization'];

      if (rawToken && typeof rawToken === 'string') {
        const accessToken = rawToken.startsWith('Bearer ')
          ? rawToken.slice(7)
          : rawToken;

        if (
          !accessToken ||
          accessToken === 'undefined' ||
          accessToken === 'null'
        ) {
          setErrorMessage('로그인 응답 토큰이 유효하지 않습니다.');
          return;
        }

        setAuth(accessToken);
        setErrorMessage('');
        navigate('/admin/list/all', { replace: true });
      } else {
        setErrorMessage('서버 응답에서 인증 정보를 찾을 수 없습니다.');
      }
    },

    onError: (error) => {
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else if (error.response?.status === 401) {
        setErrorMessage('비밀번호가 일치하지 않습니다.');
      } else if (error.response?.status === 400) {
        setErrorMessage('잘못된 요청입니다.');
      } else {
        setErrorMessage('로그인 처리 중 문제가 발생했습니다.');
      }
    },
  });
};

export default useEnterPassword;
