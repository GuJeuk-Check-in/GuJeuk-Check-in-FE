import { axiosInstance } from '@shared/api';
import type { UserDetail, UserListResponse } from '../model/types';

type UserDetailResponse = Omit<UserDetail, 'route'> & { route: UserDetail['route'] | '기타' };

export const getUserList = async (page: number, signal: AbortSignal) => {
  const response = await axiosInstance.get<UserListResponse>('/user', {
    params: { page },
    signal,
  });
  return response.data;
};

export const getUserDetail = async (userId: string, signal: AbortSignal): Promise<UserDetail> => {
  const { data } = await axiosInstance.get<UserDetailResponse>(`/user/${userId}`, { signal });

  return { ...data, route: data.route === '기타' ? 'OTHER' : data.route };
};
