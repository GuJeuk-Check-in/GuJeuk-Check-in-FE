import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { EnterPassword } from '../api/authApi';
import authStore from '../store/authStore';

const useEnterPassword = (setErrorMessage) => {
  const navigate = useNavigate();
  const { setAuthenticated } = authStore();

  return useMutation({
    mutationFn: EnterPassword,

    onSuccess: (data) => {
      console.log('로그인 응답 데이터:', data);

      if (data.success && data.token) {
        setAuthenticated(true, data.token);
        setErrorMessage('');
        navigate('/user-visit-list');
      } else {
        setErrorMessage(data.message || '로그인 실패');
      }
    },

    onError: (error) => {
      const message = error.response?.data?.message || error.message;
      setErrorMessage(message || '비밀번호 확인 중 오류가 발생했습니다.');
    },
  });
};

export default useEnterPassword;
