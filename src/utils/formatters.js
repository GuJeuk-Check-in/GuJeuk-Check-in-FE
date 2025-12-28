export const formatPhoneNumber = (rawNumber) => {
  const digits = rawNumber.replace(/[^0-9]/g, '');
  if (digits.length !== 11) {
    return rawNumber;
  }
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
};

export const sanitizePhoneNumber = (value) => {
  return value.replace(/[^0-9]/g, '').slice(0, 11);
};
