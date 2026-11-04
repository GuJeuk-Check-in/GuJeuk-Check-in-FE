export const formatPhoneNumber = (rawNumber: string): string => {
  if (!rawNumber) return '';

  const digits = rawNumber.replace(/[^0-9]/g, '');
  const limitedDigits = digits.slice(0, 11);

  if (limitedDigits.length <= 3) {
    return limitedDigits;
  } else if (limitedDigits.length <= 7) {
    return `${limitedDigits.slice(0, 3)}-${limitedDigits.slice(3)}`;
  } else {
    return `${limitedDigits.slice(0, 3)}-${limitedDigits.slice(
      3,
      7
    )}-${limitedDigits.slice(7)}`;
  }
};

export const sanitizePhoneNumber = (rawNumber: string): string => {
  if (!rawNumber) return '';
  return rawNumber.replace(/[^0-9]/g, '');
};
