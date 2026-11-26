import { axiosInstance } from '@shared/api';
import {
  CreatePurposeRequest,
  CreateSubPurposeRequest,
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
): Promise<void> => {
  await axiosInstance.post('/purpose', payload);
};

export const updatePurpose = async (
  id: number,
  payload: Omit<UpdatePurposeRequest, 'id'>
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
  await axiosInstance.delete(`/purpose/${id}`);
};

export const createSubPurpose = async (
  payload: CreateSubPurposeRequest
): Promise<void> => {
  await axiosInstance.post('/purpose/sub', payload);
};

export const deleteSubPurpose = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/purpose/sub/${id}`);
};
