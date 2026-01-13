import axiosInstance from '../common/axiosInstance';
import { UserListResponse } from './types';

export const userList = async (page = 0): Promise<UserListResponse> => {
  const response = await axiosInstance.get<UserListResponse>(
    '/admin/user/all',
    {
      params: { page },
    }
  );

  return response.data;
};

export const usersByResidence = async (
  residence: string,
  page = 0
): Promise<UserListResponse> => {
  const residenceParam = residence === '기타 지역' ? '기타' : residence;

  const response = await axiosInstance.get<UserListResponse>('/admin/user', {
    params: { residence: residenceParam, page },
  });

  return response.data;
};
