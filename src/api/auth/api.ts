import axiosInstance from '../common/axiosInstance';
import {
  EnterPasswordRequest,
  EnterPasswordResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
} from './types';

export const enterPassword = async (payload: EnterPasswordRequest) => {
  console.log('payload:', payload);
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
