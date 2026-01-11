import axiosInstance from '@shared/api/axiosInstance';
import {
  EnterPasswordRequest,
  EnterPasswordResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
} from '../model/types';

export const enterPassword = async (payload: EnterPasswordRequest) => {
  const response = await axiosInstance.post<EnterPasswordResponse>(
    '/admin/login',
    payload
  );
  return response.data;
};

export const updatePassword = async (
  payload: UpdatePasswordRequest
): Promise<UpdatePasswordResponse> => {
  const response = await axiosInstance.patch('/admin/change', payload);
  return response.data;
};
