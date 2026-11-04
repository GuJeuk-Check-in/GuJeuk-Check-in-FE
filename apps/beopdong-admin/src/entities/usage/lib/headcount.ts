const HEADCOUNT_MAX = 999;

export const HEADCOUNT_ERROR = '인원은 1 이상의 숫자로 입력해 주세요.';
export const HEADCOUNT_MAX_ERROR = '인원이 너무 많아요. 다시 확인해 주세요.';

export const toHeadcountValue = (text: string): number => {
  const count = Number(text);
  return /^\d+$/.test(text) && Number.isSafeInteger(count) ? count : Number.NaN;
};

export const getHeadcountError = (text: string): string => {
  if (text === '') return '';
  if (/^\d+$/.test(text) && Number(text) > HEADCOUNT_MAX) return HEADCOUNT_MAX_ERROR;
  const count = toHeadcountValue(text);
  return count >= 1 && count <= HEADCOUNT_MAX ? '' : HEADCOUNT_ERROR;
};
