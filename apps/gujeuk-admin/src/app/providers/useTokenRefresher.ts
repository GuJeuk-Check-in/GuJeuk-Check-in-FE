import { useEffect } from 'react';
import { useAuthStore } from '@entities/auth';
import { axiosInstance } from '@shared/api';

// 토큰 갱신을 위한 커스텀 훅
export const useTokenRefresher = () => {
  const { accessToken, setAuth, logout } = useAuthStore();
  useEffect(() => {
    if (!accessToken) return;
    const refreshCycle = 1000 * 3300;
    const timer = setInterval(async () => {
      try { // 토큰 갱신 요청
        const res = await axiosInstance.patch('/organ/re-issue');
        const newAccess = res.data?.accessToken;
        const newRefresh = res.data?.refreshToken;
        if (newAccess && newRefresh) { // 새로운 토큰이 존재하면 상태 업데이트
          setAuth(newAccess, newRefresh);
        }
      } catch (error) {
        console.error('토큰 갱신 실패:', error); // 토큰 갱신 실패 시 로그아웃 처리
        logout();
        window.location.href = '/organ/login?error=expired'; // 토큰 갱신 실패 시 로그아웃 후 로그인 페이지로 리다이렉트
      } 
    }, refreshCycle);
    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [accessToken, setAuth, logout]); // accessToken, setAuth, logout 의존성 배열에 추가
};
