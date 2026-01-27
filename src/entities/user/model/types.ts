export interface User {
  id: number;
  name: string;
  gender: 'MAN' | 'WOMAN';
  phone: string;
  birthYMD: string;
  residence: string;
  count: number;
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
  sort: Sort;
}

export interface UserSlice {
  content: User[];
  pageable: Pageable;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: Sort;
  empty: boolean;
}

export interface UserListResponse {
  totalCount: number;
  slice?: UserSlice;
  users?: User[];
}

export interface NormalizedUserPage {
  users: User[];
  totalCount: number;
  last: boolean;
  page: number;
}

export interface UserInformation {
  id: number;
  name: string;
  userId: string;
  phone: string;
  gender: 'MALE' | 'FEMALE';
  birthYMD: string;
  residence: string;
  privacyAgreed: boolean;
}

export interface UserSearchFilters {
  residence?: string | null;
  searchName?: string | null;
}

export interface UserSearchState {
  filters: UserSearchFilters;
  searchName: string;
}
