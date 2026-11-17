export type VisitGenderDto = 'MAN' | 'WOMAN';

export interface VisitListItemDto {
  id: number;
  name: string | null;
  visitDate: string;
  purpose: number[];
}

export interface VisitListResponse {
  content: VisitListItemDto[];
  pageable: { pageNumber: number; pageSize: number };
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface VisitDetailResponse {
  purpose: number[];
  name: string | null;
  gender: VisitGenderDto;
  age: number;
  phone: string;
  visitDate: string;
  visitTime: string;
}

export interface VisitRequest {
  name: string;
  age: number;
  phone: string;
  gender: VisitGenderDto;
  visitDate: string;
  purpose: number[];
  visitTime: string;
}

export interface CreateVisitResponse {
  id: number;
}
