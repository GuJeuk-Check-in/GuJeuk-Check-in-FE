const FORMATTED_PHONE_PATTERN = /^(01\d|02|0[3-9]\d)-\d{3,4}-\d{4}$/;

export const toPhoneDigits = (value: string): string => value.replace(/\D/g, '');

export const formatPhone = (value: string): string => {
  const trimmed = value.trim();
  if (FORMATTED_PHONE_PATTERN.test(trimmed)) return trimmed;

  const digits = toPhoneDigits(trimmed);
  if (digits.length === 11) return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  if (digits.length === 10) {
    return digits.startsWith('02')
      ? `02-${digits.slice(2, 6)}-${digits.slice(6)}`
      : `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 9 && digits.startsWith('02')) {
    return `02-${digits.slice(2, 5)}-${digits.slice(5)}`;
  }
  return value;
};
