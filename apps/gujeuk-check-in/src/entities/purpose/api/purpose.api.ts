import { axiosInstance } from '@shared/api';
import { PurposeResponse } from '../model/types';

export const purposeList = async (): Promise<PurposeResponse[]> => {
  const response = await axiosInstance.get<PurposeResponse[]>('/purpose/all');
  return response.data;
};
