import { axiosInstance } from '@shared/api';
import type { SchoolSearchResponse } from '../model/types';

export const searchSchools = async (name: string, page: number) => {
  const response = await axiosInstance.get<SchoolSearchResponse>('/check-in/school', {
    params: { name, page },
  });
  return response.data;
};
