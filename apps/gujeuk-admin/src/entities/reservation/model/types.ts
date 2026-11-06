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
