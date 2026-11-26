export type ReservationStatus = 'RESERVATION' | 'NONE' | 'SUB_INCLUDE';

export interface CreatePurposeRequest {
  purpose: string;
  reservationStatus: ReservationStatus;
}

export interface SubPurpose {
  id: number;
  serverId?: number;
  isSaved?: boolean;
  name: string;
  reservable: boolean;
}

export interface PurposeFormValues {
  purpose: string;
  reservationStatus: boolean;
  subPurposes: SubPurpose[];
  removedSubPurposeIds: number[];
}

export interface UpdatePurposeRequest {
  id: number;
  purpose: string;
  reservationStatus: ReservationStatus;
}

export interface CreateSubPurposeRequest {
  purpose: string;
  reservationStatus: ReservationStatus;
  subPurpose: string;
  subPurposeReservation: boolean;
}

export interface PurposeResponse {
  id: number;
  purpose: string;
  reservationStatus: ReservationStatus;
}

export type UpdatePurposeMovementRequest = {
  purposeId: number[];
};

export interface Purpose {
  id: number;
  purpose: string;
  reservationStatus: ReservationStatus;
}

export interface PurposeStore {
  purposes: Purpose[];
  subPurposesByPurposeId: Partial<Record<number, SubPurpose[]>>;
  updatePurpose: (id: number, newPurpose: string) => void;
  setSubPurposes: (id: number, items: SubPurpose[]) => void;
}
