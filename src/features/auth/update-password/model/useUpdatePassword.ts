import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  UpdatePasswordResponse,
  UpdatePasswordRequest,
} from '@entities/auth/model/types';
import { updatePassword } from '@entities/auth/api/auth.api';
import { fireSuccessEffect } from '@shared/effects';

export const useUpdatePassword = () => {
  return useMutation<
    UpdatePasswordResponse,
    AxiosError<{ message?: string }>,
    UpdatePasswordRequest
  >({
    mutationFn: updatePassword,
    onSuccess: () => {
      fireSuccessEffect();
    },
  });
};
