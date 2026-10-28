import type { UserDetail } from '../model/types';

const REQUIRED_KEYS = ['name', 'school', 'birthYMD', 'applyDate', 'phone', 'route', 'address'] as const;

export const validateUserDetail = (user: UserDetail): string | null =>
  REQUIRED_KEYS.some((key) => !user[key].trim()) ? '모든 필수 필드를 입력해주세요.' : null;
