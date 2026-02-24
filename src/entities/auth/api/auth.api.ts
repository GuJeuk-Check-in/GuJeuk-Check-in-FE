<<<<<<< HEAD
import { axiosInstance } from '@shared/api/axiosInstance';
=======
import { axiosInstance } from '@shared/api';
>>>>>>> 4da692d (chore :: import 경로 변경)
import {
  OrganLoginRequest,
  OrganLoginResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
} from '../model/types';

export const enterPassword = async (payload: OrganLoginRequest) => {
  const response = await axiosInstance.post<OrganLoginResponse>(
    '/organ/login',
    payload
  );
  return response.data;
};

export const updatePassword = async (
  payload: UpdatePasswordRequest
): Promise<UpdatePasswordResponse> => {
  const response = await axiosInstance.patch('/organ/change', payload);
  return response.data;
};
