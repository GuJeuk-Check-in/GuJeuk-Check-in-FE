import { BASE_PURPOSES, MANAGED_PURPOSES, type Purpose } from '@entities/purpose';

export const previewPurposes: readonly Purpose[] = MANAGED_PURPOSES.map((purpose, index) => ({
  id: index + 1,
  purpose,
  isLocked: index < BASE_PURPOSES.length - 1,
}));
