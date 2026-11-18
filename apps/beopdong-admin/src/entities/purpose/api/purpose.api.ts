import { axiosInstance } from '@shared/api';
import type {
  CreatePurposeRequest,
  PurposeListResponse,
  UpdatePurposeMovementRequest,
  UpdatePurposeRequest,
} from '../model/types';

export const getPurposeList = async () => {
  const response = await axiosInstance.get<PurposeListResponse>('/purpose');
  return response.data;
};

export const createPurpose = async (payload: CreatePurposeRequest) => {
  await axiosInstance.patch('/purpose', payload);
};

export const updatePurpose = async (purposeId: number, payload: UpdatePurposeRequest) => {
  await axiosInstance.patch(`/purpose/${purposeId}`, payload);
};

export const deletePurpose = async (purposeId: number) => {
  await axiosInstance.delete(`/purpose/${purposeId}`);
};

export const updatePurposeMovement = async (payload: UpdatePurposeMovementRequest) => {
  await axiosInstance.patch('/purpose/move', payload);
};
