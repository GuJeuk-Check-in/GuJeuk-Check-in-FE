import { axiosInstance } from '@shared/api';
import type {
  CreatePurposeRequest,
  PurposeListResponse,
} from '../model/types';

export const getPurposeList = async () => {
  const response = await axiosInstance.get<PurposeListResponse>('/purpose');
  return response.data;
};

export const createPurpose = async (payload: CreatePurposeRequest) => {
  await axiosInstance.patch('/purpose', payload);
};
