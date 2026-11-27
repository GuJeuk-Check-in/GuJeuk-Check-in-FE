import { axiosInstance } from '@shared/api';
import { PurposeResponse } from '../model/types';

interface PurposeListDto {
  purposes: { purposeId: number; purpose: string }[];
}

export const purposeList = async (): Promise<PurposeResponse[]> => {
  const response = await axiosInstance.get<PurposeListDto>('/purpose/all');
  return (response.data?.purposes ?? []).map(({ purposeId, purpose }) => ({
    id: purposeId,
    purpose,
  }));
};
