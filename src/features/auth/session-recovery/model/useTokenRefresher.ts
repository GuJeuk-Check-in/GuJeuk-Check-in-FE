import { useEffect } from 'react';
import { useAuthStore } from '@entities/auth/index';
import axiosInstance from '@shared/api/axiosInstance';

export const useTokenRefresher = () => {
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
          setAuth(newAccess, newRefresh);
        }
      } catch (error) {}
    }, refreshCycle);
    return () => clearInterval(timer);
  }, [accessToken, setAuth]);
};
