import { axiosInstance } from '@shared/api';
import { tokenStorage } from '../model/tokenStorage';
import type { OrganLoginRequest, OrganLoginResponse, UpdatePasswordRequest } from '../model/types';

export const organLogin = async (payload: OrganLoginRequest) => {
  const response = await axiosInstance.post<OrganLoginResponse>('/organ', payload);
  return response.data;
};

export const updatePassword = async (payload: UpdatePasswordRequest) => {
  const accessToken = tokenStorage.getAccessToken();

  await axiosInstance.patch('/organ', payload, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
  });
};
