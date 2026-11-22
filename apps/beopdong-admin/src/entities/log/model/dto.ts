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

interface VisitDetailBase {
  purpose: number[];
  name: string | null;
  gender: VisitGenderDto;
  age: number;
  visitDate: string;
  visitTime: string;
  note: string | null;
}

export interface AdultVisitDetailResponse extends VisitDetailBase {
  visitPurpose: string | null;
}

export interface MinorVisitDetailResponse extends VisitDetailBase {
  phone: string;
}

export type VisitDetailResponse = AdultVisitDetailResponse | MinorVisitDetailResponse;

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
