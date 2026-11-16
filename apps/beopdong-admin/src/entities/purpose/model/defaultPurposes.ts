export const BASE_PURPOSES = ['컴퓨터', '노래방', '탁구', '보드게임'] as const;

const ADULT_ONLY_PURPOSES = ['근로장학생', '기타(노인일자리)'] as const;

export const MANAGED_PURPOSES = [
  ...BASE_PURPOSES,
  '인터넷',
  '휴식',
  '청운위',
  '방카',
  '동아리',
  ...ADULT_ONLY_PURPOSES,
];

export const getVisitPurposeOptions = (variant: 'minor' | 'adult') =>
  variant === 'adult'
    ? MANAGED_PURPOSES
    : MANAGED_PURPOSES.filter((purpose) => !(ADULT_ONLY_PURPOSES as readonly string[]).includes(purpose));
