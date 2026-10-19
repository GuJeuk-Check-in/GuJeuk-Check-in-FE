import { useEffect } from 'react';
import { useAuthStore } from '@entities/auth';

export const useLoginPage = () => {
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    logout();
  }, [logout]);
};
