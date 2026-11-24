import type { UpdateUserRequest } from '../model/types';

const padDate = (value: string) => value.replace(/-(\d)(?=-|$)/g, '-0$1');

export const prepareUserUpdate = (draft: UpdateUserRequest): UpdateUserRequest => ({
  name: draft.name.trim(),
  grade: draft.grade,
  route: draft.route,
  routeDetail: draft.route === 'OTHER' ? draft.routeDetail?.trim() ?? null : null,
  address: draft.address.trim(),
  school: draft.school.trim(),
  schoolType: draft.schoolType,
  gender: draft.gender,
  phone: draft.phone.replace(/[\s-]/g, ''),
  birthYMD: padDate(draft.birthYMD),
  applyDate: padDate(draft.applyDate),
});
