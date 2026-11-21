import { axiosInstance } from '@shared/api';
import type { UserListResponse } from '../model/types';

export const getUserList = async (page: number, signal: AbortSignal) => {
  const response = await axiosInstance.get<UserListResponse>('/user', {
    params: { page },
    signal,
  });
  return response.data;
};
