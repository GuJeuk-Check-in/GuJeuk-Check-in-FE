import { axiosInstance } from '@shared/api';
import {
  OrganLoginRequest,
  OrganLoginResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
} from '../model/types';

// 기관 로그인 요청
export const enterPassword = async (payload: OrganLoginRequest) => {
  const response = await axiosInstance.post<OrganLoginResponse>(
    '/organ/login',
    payload
  );
  return response.data;
};

// 기관 비밀번호 변경 요청
export const updatePassword = async (
  payload: UpdatePasswordRequest
): Promise<UpdatePasswordResponse> => {
  const response = await axiosInstance.patch('/organ/change', payload);
  return response.data;
};
