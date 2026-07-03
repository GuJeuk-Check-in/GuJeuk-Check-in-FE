export type AgeType =
  | 'BABY'
  | 'AGE_9_13'
  | 'AGE_14_16'
  | 'AGE_17_19'
  | 'AGE_20_24'
  | 'ADULT';

export type GenderType = 'MAN' | 'WOMAN';

export interface ApiErrorResponse {
  message?: string;
  status?: number;
  timestamp?: string;
  description?: string;
}

export interface CheckUserRequest {
  name: string;
  phone: string;
}

export interface CheckUserResponse {
  userExists: boolean;
  userId: number | null;
}

export interface ExistingUserCheckInRequest {
  userId: number;
  maleCount: number;
  femaleCount: number;
  purpose: string;
  visitTime: string;
}

export interface NewUserSignUpRequest {
  name: string;
  gender: GenderType;
  phone: string;
  maleCount: number;
  femaleCount: number;
  birthYMD: string;
  residence: string;
  privacyAgreed: boolean;
  purpose: string;
  visitTime: string;
}

export type CheckInQueuePayload =
  | {
      kind: 'legacy-public-visit';
      payload: CreateUserVisitRequest;
    }
  | {
      kind: 'existing-user-check-in';
      payload: ExistingUserCheckInRequest;
    }
  | {
      kind: 'new-user-sign-up';
      payload: NewUserSignUpRequest;
    };

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

export interface MonthVisitListResponse {
  totalCount: number;
  slice: {
    content: UserVisit[];
    pageable: Pageable;
    size: number;
    number: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    numberOfElements: number;
    last: boolean;
    first: boolean;
    empty: boolean;
  };
}

export interface UserVisitDetailResponse {
  id: number;
  name: string | null;
  age: AgeType;
  phone: string;
  residence: string;
  maleCount: number;
  femaleCount: number;
  purpose: string;
  visitDate: string;
  visitTime: string;
  privacyAgreed: boolean;
}

export interface CreateUserVisitRequest {
  name: string | null;
  age: AgeType;
  phone: string;
  residence?: string;
  maleCount: number;
  femaleCount: number;
  purpose: string;
  visitDate: string;
  visitTime: string;
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

export interface VisitStatisticsRequest {
  year: number;
  month: number;
}

export interface VisitStatisticsGroup {
  male: number;
  female: number;
  total: number;
  rate: number;
}

export interface VisitStatisticsResponse {
  year: number;
  month: number;
  cumulative: {
    total: number;
    youth: VisitStatisticsGroup;
    other: VisitStatisticsGroup;
  };
  monthly: {
    total: number;
    youth: VisitStatisticsGroup;
    other: VisitStatisticsGroup;
  };
}
