export const formatPhoneNumber = (rawNumber: string): string => {
  if (!rawNumber) return '';

  // 숫자와 -만 허용, 최대 13자 (010-1234-5678 형식)
  return rawNumber.replace(/[^0-9-]/g, '').slice(0, 13);
};
