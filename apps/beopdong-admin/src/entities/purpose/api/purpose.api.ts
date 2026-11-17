import { axiosInstance } from '@shared/api';
import type { PurposeListResponse } from '../model/types';

export const getPurposeList = async () => {
  const response = await axiosInstance.get<PurposeListResponse>('/purpose');
  return response.data;
};
