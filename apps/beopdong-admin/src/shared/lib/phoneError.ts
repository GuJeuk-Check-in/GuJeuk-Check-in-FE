import { isValidPhone } from '@center/ui/form';

export const PHONE_ERROR = '연락처 형식을 확인해 주세요.';

export const getPhoneError = (value: string): string =>
  value.trim() === '' || isValidPhone(value) ? '' : PHONE_ERROR;
