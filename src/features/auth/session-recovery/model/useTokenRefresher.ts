import { useEffect } from 'react';
import { useAuthStore } from '@entities/auth/model/authstore';
import axiosInstance from '@shared/api/axiosInstance';

const useTokenRefresher = () => {
  const { accessToken, setAuth, logout } = useAuthStore();
  useEffect(() => {
    if (!accessToken) return;
    const refreshCycle = 1000 * 3300;
    const timer = setInterval(async () => {
      try {
        const res = await axiosInstance.patch('admin/re-issue');
        const newAccess = res.data?.accessToken;
        const newRefresh = res.data?.refreshToken;
        if (newAccess && newRefresh) {
          console.log('토큰 갱신 성공');
          setAuth(newAccess, newRefresh);
        }
      } catch (error) {
        console.error('자동 갱신 실패: ', error);
      }
    }, refreshCycle);
    return () => clearInterval(timer);
  }, [accessToken, setAuth]);
};

export default useTokenRefresher;
