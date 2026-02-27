import { useEffect } from 'react';
<<<<<<< HEAD
import { useAuthStore } from '@entities/auth/index';
import { axiosInstance } from '@shared/api/axiosInstance';
=======
import { useAuthStore } from '@entities/auth';
import { axiosInstance } from '@shared/api';
>>>>>>> 4da692d (chore :: import 경로 변경)

export const useTokenRefresher = () => {
  const { accessToken, setAuth, logout } = useAuthStore();
  useEffect(() => {
    if (!accessToken) return;
    const refreshCycle = 1000 * 3300;
    const timer = setInterval(async () => {
      try {
        const res = await axiosInstance.patch('/organ/re-issue');
        const newAccess = res.data?.accessToken;
        const newRefresh = res.data?.refreshToken;
        if (newAccess && newRefresh) {
          setAuth(newAccess, newRefresh);
        }
      } catch (error) {
        console.error('토큰 갱신 실패:', error);
        logout();
      }
    }, refreshCycle);
    return () => clearInterval(timer);
  }, [accessToken, setAuth, logout]);
};
