import { useEffect } from 'react';
import { useAuthStore } from '@entities/auth';

export const useLoginPage = () => {
  const logout = useAuthStore((state) => state.logout); // 로그아웃 함수 가져오기

  useEffect(() => { // 컴포넌트가 마운트될 때 로그아웃 처리
    logout();
  }, [logout]);
};
