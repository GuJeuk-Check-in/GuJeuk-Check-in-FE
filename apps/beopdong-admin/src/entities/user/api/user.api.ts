import { axiosInstance } from '@shared/api';
import type { UpdateUserRequest, UserDetail, UserListResponse, UserSearchResponse } from '../model/types';

type UserDetailResponse = Omit<UserDetail, 'route'> & { route: UserDetail['route'] | '기타' };

export const getUserList = async (page: number, signal: AbortSignal) => {
  const response = await axiosInstance.get<UserListResponse>('/user', {
    params: { page },
    signal,
  });
  return response.data;
};

export const searchUsers = async (name: string, signal: AbortSignal) => {
  const { data } = await axiosInstance.get<UserSearchResponse>('/user/search', {
    params: { name },
    signal,
  });
  return data;
};

export const getUserDetail = async (userId: string, signal: AbortSignal): Promise<UserDetail> => {
  const { data } = await axiosInstance.get<UserDetailResponse>(`/user/${userId}`, { signal });

  return { ...data, route: data.route === '기타' ? 'OTHER' : data.route };
};

export const updateUser = async (userId: string, request: UpdateUserRequest): Promise<void> => {
  await axiosInstance.patch(`/user/${userId}`, request);
};
