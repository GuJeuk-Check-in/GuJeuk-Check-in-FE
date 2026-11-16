import { axiosInstance } from '@shared/api';
import type { CreateVisitRequest, CreateVisitResponse, UpdateVisitRequest, VisitDetailResponse, VisitListResponse } from '../model/dto';

export const VISIT_PAGE_SIZE = 30;

export const getVisits = async (page: number, size: number = VISIT_PAGE_SIZE) => {
  const response = await axiosInstance.get<VisitListResponse>('/log/organ', { params: { page, size } });
  return response.data;
};

export const getVisit = async (logId: string | number) => {
  const response = await axiosInstance.get<VisitDetailResponse>(`/log/organ/${logId}`);
  return response.data;
};

export const deleteVisit = async (logId: number) => {
  await axiosInstance.delete(`/log/${logId}`);
};

export const updateVisit = async (logId: number, payload: UpdateVisitRequest) => {
  await axiosInstance.patch(`/log/${logId}`, payload);
};

export const createVisit = async (payload: CreateVisitRequest) => {
  const response = await axiosInstance.post<CreateVisitResponse>('/log', payload);
  return response.data;
};
