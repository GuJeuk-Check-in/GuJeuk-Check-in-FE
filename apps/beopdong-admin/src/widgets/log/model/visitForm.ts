import type { UserVisitDetailRecord } from '@entities/log';

export type VisitFormVariant = 'minor' | 'adult';

export interface VisitFormData {
  name: string;
  age: string;
  gender: string;
  phone: string;
  visitTime: string;
  purposes: string[];
  visitDate: string;
  visitPurpose: string;
  note: string | null;
}

export const createVisitFormData = (visit?: UserVisitDetailRecord): VisitFormData => ({
  name: visit?.name ?? '',
  age: String(visit?.age ?? ''),
  gender: visit?.gender ?? '',
  phone: visit?.phone ?? '',
  visitTime: visit?.visitTime ?? '',
  purposes: [...(visit?.purposes ?? [])],
  visitDate: visit?.visitDate ?? '',
  visitPurpose: visit?.visitPurpose ?? '',
  note: visit?.note ?? null,
});
