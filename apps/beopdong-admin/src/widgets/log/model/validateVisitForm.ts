import { toPhoneDigits } from '@center/ui/form';
import { getPhoneError } from '@shared/lib/phoneError';
import { isAdultAge } from '@entities/log';
import type { VisitFormData, VisitFormVariant } from './visitForm';

export const ADULT_AGE_ERROR = '성인 등록은 만 20세 이상만 가능합니다.';

export const MINOR_AGE_ERROR = '미성년 등록은 만 20세 미만만 가능합니다.';

// 상세 화면의 성인 분류 기준(isAdultAge)과 등록 경로가 어긋나지 않도록 양방향으로 막는다.
export const getAgeVariantError = (age: string, variant: VisitFormVariant): string => {
  if (!/^\d+(?:\s*세)?$/.test(age.trim())) return '';
  const isAdult = isAdultAge(Number.parseInt(age, 10));
  if (variant === 'adult') return isAdult ? '' : ADULT_AGE_ERROR;
  return isAdult ? MINOR_AGE_ERROR : '';
};

export type VisitFormField = 'name' | 'age' | 'gender' | 'phone' | 'visitTime' | 'purposes' | 'visitDate';

export const getEmptyFields = (value: VisitFormData, variant: VisitFormVariant = 'minor'): ReadonlySet<VisitFormField> => {
  const isAdult = variant === 'adult';
  const empty = new Set<VisitFormField>();
  if (!isAdult && !value.name.trim()) empty.add('name');
  if (!value.age.trim()) empty.add('age');
  if (!value.gender) empty.add('gender');
  if (!isAdult && !toPhoneDigits(value.phone)) empty.add('phone');
  if (!value.visitTime.trim()) empty.add('visitTime');
  if (value.purposes.length === 0) empty.add('purposes');
  if (!value.visitDate) empty.add('visitDate');
  return empty;
};

export const validateVisitForm = (
  value: VisitFormData,
  variant: VisitFormVariant = 'minor',
): string | null => {
  if (getEmptyFields(value, variant).size > 0) {
    return '모든 필수 필드를 입력해주세요.';
  }

  if (variant !== 'adult') {
    const phoneError = getPhoneError(value.phone);
    if (phoneError) return phoneError;
  }

  if (!/^\d+(?:\s*세)?$/.test(value.age.trim())) {
    return '연령은 0 이상의 정수로 입력해주세요. 예) 16세';
  }

  const ageError = getAgeVariantError(value.age, variant);
  if (ageError) return ageError;

  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(value.visitTime)) {
    return '방문 시간은 24시간 형식으로 입력해주세요. 예) 17:00';
  }

  return null;
};
