export type ReservationStatus = 'RESERVATION' | 'NONE' | 'SUB_INCLUDE';

export interface SubPurposeDto {
  subPurposeId: number;
  subPurpose: string;
  subPurposeReservation: boolean;
}

export interface PurposeDto {
  purposeId: number;
  purpose: string;
  reservationStatus: ReservationStatus;
  subPurposes: SubPurposeDto[];
}

export interface PurposeListDto {
  purposes: PurposeDto[];
}

export interface SubPurpose {
  id: number;
  name: string;
  reservable: boolean;
}

export interface Purpose {
  id: number;
  purpose: string;
  reservationStatus: ReservationStatus;
  subPurposes: SubPurpose[];
}

export type PurposeResponse = Purpose;

export interface CreatePurposeRequest {
  purpose: string;
  reservationStatus: ReservationStatus;
}

export interface UpdatePurposeRequest {
  purpose: string;
  reservationStatus: ReservationStatus;
}

export interface CreateSubPurposeRequest {
  purpose: string;
  reservationStatus: ReservationStatus;
  subPurpose: string;
  subPurposeReservation: boolean;
}

export interface UpdateSubPurposeRequest {
  subPurpose: string;
  subPurposeReservation: boolean;
}

export type UpdatePurposeMovementRequest = {
  purposeId: number[];
};

export interface PurposeFormSubPurpose {
  key: string;
  serverId?: number;
  name: string;
  reservable: boolean;
}

export interface PurposeFormValues {
  purpose: string;
  reservationStatus: boolean;
  subPurposes: PurposeFormSubPurpose[];
}
