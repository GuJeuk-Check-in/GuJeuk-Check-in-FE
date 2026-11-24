const ADULT_ONLY_PURPOSES = ['근로장학생', '기타(노인일자리)'] as const;

export const getVisitPurposeOptions = (variant: 'minor' | 'adult', purposeNames: readonly string[]) =>
  variant === 'adult'
    ? purposeNames
    : purposeNames.filter((purpose) => !(ADULT_ONLY_PURPOSES as readonly string[]).includes(purpose));
