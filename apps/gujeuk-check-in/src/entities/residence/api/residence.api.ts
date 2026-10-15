import { publicAxiosInstance } from '@shared/api';
import { ResidenceResponse } from '../model/types';

export const publicResidenceList = async (): Promise<ResidenceResponse[]> => {
  const response = await publicAxiosInstance.get<ResidenceResponse[]>(
    '/residence/all'
  );
  return response.data;
};
