export const formatAge = (value: string): string => {
  const matched = value.trim().match(/^(\d+(?:\.\d+)?)\s*[가-힣]*$/);
  return matched ? `${Math.round(Number(matched[1]))}세` : value;
};
