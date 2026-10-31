export const formatAge = (value: string): string => {
  const matched = value.trim().match(/^(\d+)\s*[가-힣]*$/);
  return matched ? `${matched[1]}세` : value;
};
