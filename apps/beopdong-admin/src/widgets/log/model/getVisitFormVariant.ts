import { isAdultAge } from '@entities/log';
import type { VisitFormVariant } from './visitForm';

export const getVisitFormVariant = (age: string): VisitFormVariant => {
  if (!/^\d+(?:\s*세)?$/.test(age.trim())) return 'minor';
  return isAdultAge(Number.parseInt(age, 10)) ? 'adult' : 'minor';
};
