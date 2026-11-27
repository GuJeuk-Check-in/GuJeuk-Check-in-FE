export interface ReservationFacilityResponse {
  purposeId: number;
  purpose: string;
  subPurposeId: number | null;
  subPurpose: string | null;
}

export interface ReservationResponse {
  id: number;
  purposeId: number;
  purpose: string;
  subPurposeId: number | null;
  subPurpose: string | null;
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
  facilities: ReservationFacilityResponse[];
  reservations: ReservationResponse[];
}

export interface CreateReservationRequest {
  name: string;
  phone: string;
  maleCount: number;
  femaleCount: number;
  purposeId: number;
  subPurposeId: number | null;
  startTime: string;
}
