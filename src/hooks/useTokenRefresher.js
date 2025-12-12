import { useEffect } from 'react';
import useAuthStore from '../store/authStore';
import axiosInstance from '../api/axiosInstance';

const useTokenRefresher = () => {
  const { accessToken, setAuth, logout } = useAuthStore();

  useEffect(() => {
    if (!accessToken) return;

    const refreshCycle = 1000 * 20;

    const timer = setInterval(async () => {
      console.log('50초 경과');
      try {
        const res = await axiosInstance.patch('admin/re-issue');

        const newAccess = res.data?.accessToken;
        const newRefresh = res.data?.refreshToken;

        if (newAccess && newRefresh) {
          console.log('토큰 갱신 성공');
          setAuth(newAccess, newRefresh);
        }
      } catch (error) {
        console.error('자동 갱신 실패:', error);
      }
    }, refreshCycle);

    return () => clearInterval(timer);
  }, [accessToken, setAuth]);
};

export default useTokenRefresher;
