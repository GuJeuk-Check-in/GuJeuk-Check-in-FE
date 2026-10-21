import type { VisitFormData } from './visitForm';

export const validateVisitForm = (value: VisitFormData): string | null => {
  if (
    !value.name.trim() || !value.age.trim() || !value.gender ||
    !value.phone.trim() || !value.usageMinutes.trim() ||
    value.purposes.length === 0 || !value.visitDate
  ) {
    return '모든 필수 필드를 입력해주세요.';
  }

  if (!/^\d+(?:\s*세)?$/.test(value.age.trim()) || !/^\d+(?:\s*분)?$/.test(value.usageMinutes.trim())) {
    return '연령과 이용 시간은 0 이상의 정수로 입력해주세요. 예) 16세, 46분';
  }

  return null;
};
