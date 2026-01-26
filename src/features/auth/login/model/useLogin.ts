import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  enterPassword,
  useAuthStore,
  type EnterPasswordResponse,
} from '@entities/auth';
import { fireSuccessEffect } from '@shared/effects';

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation<
    EnterPasswordResponse,
    AxiosError<{ message?: string }>,
    { password: string }
  >({
    mutationFn: enterPassword,

    onSuccess: ({ accessToken, refreshToken }) => {
      if (accessToken && refreshToken) {
        setAuth(accessToken, refreshToken);
        fireSuccessEffect();
      }
    },
  });
};
