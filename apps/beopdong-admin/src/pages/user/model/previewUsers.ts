import type { User } from '@entities/user';
import { previewUserDetails } from './previewUserDetail';

const VISIT_COUNTS: Readonly<Record<number, number>> = { 1: 12, 2: 8, 3: 4, 4: 6, 5: 0, 6: 2 };

export const previewUsers: readonly User[] = Object.entries(previewUserDetails).map(
  ([id, { name, school, grade, birthYMD, phone }]) => ({
    id: Number(id),
    name,
    school,
    grade,
    birthYMD,
    phone,
    visitCount: VISIT_COUNTS[Number(id)],
  }),
);
