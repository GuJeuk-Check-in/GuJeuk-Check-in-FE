export const formatAge = (value: string): string => {
  const digits = value.trim().match(/^\d+/)?.[0];
  return digits ? `${digits}세` : value;
};
