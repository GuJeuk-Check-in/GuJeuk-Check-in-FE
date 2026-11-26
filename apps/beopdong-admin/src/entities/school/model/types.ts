export type SchoolType = 'ELEMENTARY' | 'MIDDLE' | 'HIGH' | 'OTHER';

export interface School {
  educationOfficeCode: string;
  schoolCode: string;
  schoolName: string;
  schoolType: SchoolType;
  address: string;
}

export interface SchoolSearchResponse {
  schools: School[];
  page: number;
  hasNext: boolean;
}
