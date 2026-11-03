import { toPhoneDigits } from '@center/ui/form';
import { getPhoneError } from '@shared/lib/phoneError';
import type { UserDetail } from '../model/types';

const REQUIRED_KEYS = ['name', 'school', 'birthYMD', 'applyDate', 'route', 'address'] as const;

export const validateUserDetail = (user: UserDetail): string | null => {
  if (REQUIRED_KEYS.some((key) => !user[key].trim()) || !toPhoneDigits(user.phone)) {
    return '모든 필수 필드를 입력해주세요.';
  }

  return getPhoneError(user.phone) || null;
};
