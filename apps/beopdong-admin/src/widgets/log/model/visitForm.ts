import type { UserVisitDetailRecord } from '@entities/log';

export interface VisitFormData {
  name: string;
  age: string;
  gender: string;
  phone: string;
  visitTime: string;
  purposes: string[];
  visitDate: string;
}

export const createVisitFormData = (visit?: UserVisitDetailRecord): VisitFormData => ({
  name: visit?.name ?? '',
  age: String(visit?.age ?? ''),
  gender: visit?.gender ?? '',
  phone: visit?.phone ?? '',
  visitTime: visit?.visitTime ?? '',
  purposes: [...(visit?.purposes ?? [])],
  visitDate: visit?.visitDate ?? '',
});
