import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { UpdatePassword } from '../api/authApi';
import useAuthStore from '../store/authStore';

const useUpdatePassword = (setErrorMessage) => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: async ({ currentPassword, newPassword, checkNewPassword }) => {
      return await UpdatePassword(
        currentPassword,
        newPassword,
        checkNewPassword
      );
    },

    onSuccess: () => {
      setErrorMessage('');
      alert('비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.');
      logout();
      navigate('/admin/login', { replace: true });
    },

    onError: (error) => {
      console.error('비밀번호 확인 에러:', error);

      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else if (error.response?.status === 401) {
        setErrorMessage('비밀번호가 일치하지 않습니다.');
      } else if (error.response?.status === 400) {
        setErrorMessage(
          '기존 비밀번호와 동일한 비밀번호는 사용할 수 없습니다.'
        );
      } else if (error.response?.status === 404) {
        setErrorMessage('관리자를 찾을 수 없습니다.');
      } else {
        setErrorMessage('비밀번호 확인 중 오류가 발생했습니다.');
      }
    },
  });
};

export default useUpdatePassword;
