import { axiosInstance } from '@shared/api';

export interface ReservationResponse {
  id: number;
  purpose: string;
  name: string;
  maleCount: number;
  femaleCount: number;
  phone: string;
  startTime: string;
  endTime: string;
}

export interface ReservationListResponse {
  inUseCount: number;
  availableCount: number;
  reservations: ReservationResponse[];
}

export interface CreateReservationRequest {
  name: string;
  phone: string;
  maleCount: number;
  femaleCount: number;
  purpose: string;
  startTime: string;
}

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
