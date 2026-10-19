import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  enterPassword,
  useAuthStore,
  type OrganLoginResponse,
} from '@entities/auth';

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation<
    OrganLoginResponse,
    AxiosError<{ message?: string }>,
    { organName: string; password: string }
  >({
    mutationFn: ({ organName, password }) =>
      enterPassword({
        organName,
        password,
        client: 'ADMIN_VIEW',
      }),

    onSuccess: ({ accessToken, refreshToken }) => {
      if (accessToken && refreshToken) {
        setAuth(accessToken, refreshToken);
      }
    },
  });
};
