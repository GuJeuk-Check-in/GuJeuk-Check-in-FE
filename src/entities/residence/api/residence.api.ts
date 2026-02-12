import axiosInstance from '@shared/api/axiosInstance';
import {
  CreateResidenceRequest,
  UpdateResidenceRequest,
  ResidenceResponse,
  UpdateResidenceMovementRequest,
} from '../model/types';

export const residenceList = async (): Promise<ResidenceResponse[]> => {
  const response = await axiosInstance.get<ResidenceResponse[]>('/residence');
  return response.data;
};

export const createResidence = async (
  payload: CreateResidenceRequest
): Promise<ResidenceResponse> => {
  const response = await axiosInstance.post('/residence', payload);
  return response.data;
};

export const updateResidence = async (
  id: number,
  payload: UpdateResidenceRequest
): Promise<void> => {
  await axiosInstance.patch(`/residence/${id}`, payload);
};

export const deleteResidence = async (id: number): Promise<void> => {
  const response = await axiosInstance.delete(`/residence/${id}`);
  return response.data;
};

export const updateResidenceMovement = async (
  data: UpdateResidenceMovementRequest
) => {
  const response = await axiosInstance.patch('/residence/move', data);
  return response.data;
};
