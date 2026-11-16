import { isAdultAge } from './isAdultAge';

export const getVisitDisplayName = (visit: { readonly name: string | null; readonly age?: number }) => {
  if (visit.name?.trim()) return visit.name;
  return visit.age !== undefined && isAdultAge(visit.age) ? '성인' : '';
};
