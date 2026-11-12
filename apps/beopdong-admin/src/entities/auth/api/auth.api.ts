import { axiosInstance } from '@shared/api';
import type { OrganLoginRequest, OrganLoginResponse, UpdatePasswordRequest } from '../model/types';

export const organLogin = async (payload: OrganLoginRequest) => {
  const response = await axiosInstance.post<OrganLoginResponse>('/organ', payload);
  return response.data;
};

export const updatePassword = async (payload: UpdatePasswordRequest) => {
  await axiosInstance.patch('/organ', payload);
};
