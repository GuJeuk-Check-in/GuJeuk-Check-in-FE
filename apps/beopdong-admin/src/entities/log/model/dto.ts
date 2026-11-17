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
  visitPurpose?: string | null;
  note?: string | null;
}

interface VisitRequestBase {
  name: string;
  age: number;
  gender: VisitGenderDto;
  visitDate: string;
  purpose: number[];
  visitTime: string;
  note: string | null;
}

export interface AdultVisitRequest extends VisitRequestBase {
  visitPurpose: string;
}

export interface MinorVisitRequest extends VisitRequestBase {
  phone: string;
}

export type VisitRequest = AdultVisitRequest | MinorVisitRequest;

export interface CreateVisitResponse {
  id: number;
}
