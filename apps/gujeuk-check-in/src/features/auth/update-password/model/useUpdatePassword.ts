import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  UpdatePasswordResponse,
  UpdatePasswordRequest,
  updatePassword,
} from '@entities/auth';
export const useUpdatePassword = () => {
  return useMutation<
    UpdatePasswordResponse,
    AxiosError<{ message?: string }>,
    UpdatePasswordRequest
  >({
    mutationFn: updatePassword,
  });
};
