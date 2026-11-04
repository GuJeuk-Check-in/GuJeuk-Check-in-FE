export interface User {
  id: number;
  name: string;
  school: string;
  grade: number;
  birthYMD: string;
  phone: string;
  count?: number | null;
}
