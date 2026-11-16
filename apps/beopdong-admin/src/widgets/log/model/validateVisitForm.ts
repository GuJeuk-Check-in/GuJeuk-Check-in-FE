import { toPhoneDigits } from '@center/ui/form';
import { getPhoneError } from '@shared/lib/phoneError';
import { isAdultAge } from '@entities/log';
import type { VisitFormData, VisitFormVariant } from './visitForm';

export const ADULT_AGE_ERROR = '성인 등록은 만 20세 이상만 가능합니다.';

// 성인 등록은 이름·연락처를 받지 않으므로, 상세 화면에서 미성년으로 분류될 연령은 막는다.
export const getAgeVariantError = (age: string, variant: VisitFormVariant): string => {
  if (variant !== 'adult' || !/^\d+(?:\s*세)?$/.test(age.trim())) return '';
  return isAdultAge(Number.parseInt(age, 10)) ? '' : ADULT_AGE_ERROR;
};

export const validateVisitForm = (
  value: VisitFormData,
  variant: VisitFormVariant = 'minor',
): string | null => {
  const isAdult = variant === 'adult';
  if (
    (!isAdult && !value.name.trim()) || !value.age.trim() || !value.gender ||
    (!isAdult && !toPhoneDigits(value.phone)) || !value.visitTime.trim() ||
    value.purposes.length === 0 || !value.visitDate
  ) {
    return '모든 필수 필드를 입력해주세요.';
  }

  if (!isAdult) {
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
