export interface CreateResidenceRequest {
  residenceName: string;
}

export interface UpdateResidenceRequest {
  id: number;
}

export interface ResidenceResponse {
  id: number;
  residenceName: string;
}

export type UpdateResidenceMovementRequest = {
  residenceId: number[];
};

export interface Residence {
  id: number;
  residenceName: string;
}

export interface ResidenceStore {
  residences: Residence[];
  updateResidence: (id: number, newResidenceName: string) => void;
}
