export interface CreatePurposeRequest {
  purpose: string;
  reservationStatus: boolean;
}

export interface SubPurpose {
  id: number;
  name: string;
  reservable: boolean;
}

export interface PurposeFormValues extends CreatePurposeRequest {
  subPurposes: SubPurpose[];
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
  reservationStatus: boolean;
}

export interface PurposeStore {
  purposes: Purpose[];
  subPurposesByPurposeId: Partial<Record<number, SubPurpose[]>>;
  updatePurpose: (id: number, newPurpose: string) => void;
  setSubPurposes: (id: number, items: SubPurpose[]) => void;
}
