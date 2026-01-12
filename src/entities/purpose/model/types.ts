export interface CreatePurposeRequest {
  purpose: string;
}

export interface UpdatePurposeRequest {
  id: number;
  purpose: string;
}

export interface PurposeResponse {
  id: number;
  purpose: string;
}

export type UpdatePurposeMovementRequest = {
  PurposeId: number[];
};

export interface Purpose {
  id: number;
  purpose: string;
}

export interface PurposeStore {
  purposes: Purpose[];
  updatePurpose: (id: number, newPurpose: string) => void;
}
