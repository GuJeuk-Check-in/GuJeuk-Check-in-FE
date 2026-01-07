export type AgeType =
  | 'BABY'
  | 'AGE_9_13'
  | 'AGE_14_16'
  | 'AGE_17_19'
  | 'AGE_20_24'
  | 'ADULT';

export interface UserVisit {
  id: number;
  name: string | null;
  age: AgeType;
  phone: string;
  maleCount: number;
  femaleCount: number;
  purpose: string;
  visitDate: string;
  privacyAgreed: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
}

export interface UserVisitListResponse {
  content: UserVisit[];
  pageable: Pageable;
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}

export interface UserVisitDetailResponse {
  name: string | null;
  age: AgeType;
  phone: string;
  maleCount: number;
  femaleCount: number;
  purpose: string;
  visitDate: string;
  privacyAgreed: boolean;
}

export interface CreateUserVisitRequest {
  name: string | null;
  age: AgeType;
  phone: string;
  maleCount: number;
  femaleCount: number;
  purpose: string;
  visitDate: string;
  privacyAgreed: boolean;
}

export interface UpdateUserVisitRequest extends CreateUserVisitRequest {
  id: number;
}

export interface DeleteUserVisitRequest {
  id: number;
}

export type DeleteUserVisitResponse = string;

export interface ExportVisitListRequest {
  year: number;
  month: number;
}
