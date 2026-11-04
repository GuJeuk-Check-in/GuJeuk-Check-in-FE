import type { VisitFormData } from './visitForm';

export const validateVisitForm = (value: VisitFormData): string | null => {
  if (
    !value.name.trim() || !value.age.trim() || !value.gender ||
    !value.phone.trim() || !value.visitTime.trim() ||
    value.purposes.length === 0 || !value.visitDate
  ) {
    return '모든 필수 필드를 입력해주세요.';
  }

  if (!/^\d+(?:\s*세)?$/.test(value.age.trim())) {
    return '연령은 0 이상의 정수로 입력해주세요. 예) 16세';
  }

  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(value.visitTime)) {
    return '방문 시간은 24시간 형식으로 입력해주세요. 예) 17:00';
  }

  return null;
};
