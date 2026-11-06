export interface CreatePurposeRequest {
  purpose: string;
  reservationStatus: boolean;
}

export interface UpdatePurposeRequest {
  id: number;
  purpose: string;
  reservationStatus: boolean;
}

export interface PurposeResponse {
  id: number;
  purpose: string;
  reservationStatus: boolean;
}

export type UpdatePurposeMovementRequest = {
  purposeId: number[];
};

export interface Purpose {
  id: number;
  purpose: string;
}

export interface PurposeStore {
  purposes: Purpose[];
  updatePurpose: (id: number, newPurpose: string) => void;
}
