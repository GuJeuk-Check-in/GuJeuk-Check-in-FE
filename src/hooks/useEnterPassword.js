import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { EnterPassword } from '../api/authApi';
import useAuthStore from '../store/authStore';

const useEnterPassword = (setErrorMessage) => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: EnterPassword,

    onSuccess: (data) => {
      if (data.accessToken) {
        setAuth(data.accessToken);
        setErrorMessage('');
        navigate('/user-visit-list', { replace: true });
      } else {
        setErrorMessage('로그인에 실패했습니다.');
      }
    },

    onError: (error) => {
      console.error('비밀번호 확인 에러:', error);

      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else if (error.response?.status === 401) {
        setErrorMessage('비밀번호가 일치하지 않습니다.');
      } else if (error.response?.status === 400) {
        setErrorMessage('잘못된 요청입니다.');
      } else {
        setErrorMessage('비밀번호 확인 중 오류가 발생했습니다.');
      }
    },
  });
};

export default useEnterPassword;
