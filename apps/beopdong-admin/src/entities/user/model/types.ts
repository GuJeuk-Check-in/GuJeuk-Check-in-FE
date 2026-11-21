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

export type Gender = 'MAN' | 'WOMAN';
export type UserRoute = 'FRIEND' | 'PARENT' | 'OTHER';

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
