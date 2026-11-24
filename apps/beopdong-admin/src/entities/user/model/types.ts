export interface User {
  id: number;
  name: string;
  school: string;
  grade: number;
  birthYMD: string;
  phone: string;
  visitCount: number;
}

export interface UserListResponse {
  content: User[];
  first: boolean;
  last: boolean;
  number: number;
}

export interface UserSearchResponse {
  totalCount: number;
  content: User[];
}

export type Gender = 'MAN' | 'WOMAN';
export type UserRoute = 'FRIEND' | 'PARENT' | 'OTHER';
export type SchoolType = 'ELEMENTARY' | 'MIDDLE' | 'HIGH';

export interface UserDetail {
  name: string;
  grade: number;
  school: string;
  route: UserRoute;
  routeDetail: string | null;
  address: string;
  gender: Gender;
  phone: string;
  birthYMD: string;
  applyDate: string;
}

export interface UpdateUserRequest extends UserDetail {
  schoolType: SchoolType | null;
}
