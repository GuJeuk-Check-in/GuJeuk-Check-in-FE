import { axiosInstance } from '@shared/api';
import type { CreateReservationRequest, ReservationListResponse } from '../model/types';

export const getReservations = async (): Promise<ReservationListResponse> => {
  const response = await axiosInstance.get<ReservationListResponse>('/reservation');
  return response.data;
};

export const createReservation = async (request: CreateReservationRequest): Promise<void> => {
  await axiosInstance.post('/reservation', request);
};

export const deleteReservation = async (reservationId: number): Promise<void> => {
  await axiosInstance.delete(`/reservation/${reservationId}`);
};
