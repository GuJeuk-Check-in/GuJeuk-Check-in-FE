<<<<<<< HEAD
import { axiosInstance, axiosPublicInstance } from '@shared/api/axiosInstance';
=======
import { axiosInstance } from '@shared/api';
>>>>>>> 4da692d (chore :: import 경로 변경)
import {
  CreatePurposeRequest,
  PurposeResponse,
  UpdatePurposeMovementRequest,
  UpdatePurposeRequest,
} from '../model/types';

export const purposeList = async (): Promise<PurposeResponse[]> => {
  const response = await axiosInstance.get<PurposeResponse[]>('/purpose/all');
  return response.data;
};

export const createPurpose = async (
  payload: CreatePurposeRequest
): Promise<PurposeResponse> => {
  const response = await axiosInstance.post('/purpose', payload);
  return response.data;
};

export const updatePurpose = async (
  id: number,
  payload: UpdatePurposeRequest
): Promise<void> => {
  await axiosInstance.patch(`/purpose/${id}`, payload);
};

export const updatePurposeMovement = async (
  data: UpdatePurposeMovementRequest
) => {
  const response = await axiosInstance.patch('/purpose/move', data);
  return response.data;
};

export const deletePurpose = async (id: number): Promise<void> => {
  const response = await axiosInstance.delete(`/purpose/${id}`);
  return response.data;
};
