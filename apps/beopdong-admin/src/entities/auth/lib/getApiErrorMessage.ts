import { isAxiosError } from 'axios';
import type { ApiErrorResponse } from '../model/types';

export const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.message || fallback;
  }
  return fallback;
};
