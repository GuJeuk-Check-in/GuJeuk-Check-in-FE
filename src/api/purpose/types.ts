export interface CreatePurposeRequset {
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
