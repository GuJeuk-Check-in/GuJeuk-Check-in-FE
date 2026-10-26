export interface User {
  id: number;
  name: string;
  school: string;
  grade: number;
  birthYMD: string;
  phone: string;
  count?: number | null;
}

export type Gender = 'MAN' | 'WOMAN';

export interface UserDetail {
  name: string;
  grade: number;
  school: string;
  route: string;
  address: string;
  gender: Gender;
  phone: string;
  birthYMD: string;
  applyDate: string;
}
