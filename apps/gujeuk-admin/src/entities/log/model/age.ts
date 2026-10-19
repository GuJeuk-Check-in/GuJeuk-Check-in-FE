

  /*
  코드 주석 작성일: 2026/09/27
  작성자: 박민건
  전체적인 기능: 사용자에 따른 value에 따라 age 혹은 label을 반환한다.
*/

// 기능: AGE_OPTION이라는 객체 안에 value에 따른 label을 불리한다.

export const AGE_OPTIONS = [
  { value: 'BABY', label: '0~8세' },
  { value: 'AGE_9_13', label: '9~13세' },
  { value: 'AGE_14_16', label: '14~16세' },
  { value: 'AGE_17_19', label: '17~19세' },
  { value: 'AGE_20_24', label: '20~24세' },
  { value: 'ADULT', label: '성인' },
] as const;

// 기능: AgeType 과 AgeLabel을 각각 value 와 label로 프로퍼티를 묶어 놓는다.

export type AgeOption = (typeof AGE_OPTIONS)[number];
export type AgeType = AgeOption['value'];
export type AgeLabel = AgeOption['label'];

// 기능: AGE_LABELS 라는 배열을 새로 생성하는데 AgeLabel의 프로퍼티만 꺼내어서 읽기 전용 배열로 만든다.
export const AGE_LABELS: readonly AgeLabel[] = AGE_OPTIONS.map(
  ({ label }) => label
);

const AGE_TYPE_BY_LABEL = Object.fromEntries(
  AGE_OPTIONS.map((option) => [option.label, option.value])
) as Record<AgeLabel, AgeType>;

const AGE_LABEL_BY_TYPE = Object.fromEntries(
  AGE_OPTIONS.map((option) => [option.value, option.label])
) as Record<AgeType, AgeLabel>;

// 기능: 사용자가 Age 값을 넣으면 값에 맡는 label을 찾고 값이 맞는 value 값이 나온다.
export const getAgeTypeByLabel = (label: string): AgeType | undefined => {
  const normalizedLabel = label.trim();

  return AGE_TYPE_BY_LABEL[normalizedLabel as AgeLabel];
};

// 기능: 사용자가 Age 값을 넣으면 값에 맡는 age를 찾고 값이 true면 label 값이 나오고 false면 사용자가 넣은 age 값이 나온다.
export const getAgeLabel = (age: AgeType | string): string => {
  if (typeof age === 'string') {
    return AGE_LABEL_BY_TYPE[age as AgeType] ?? age;
  }

  return AGE_LABEL_BY_TYPE[age] ?? age;
};

// 기능: 사용자가 넣은 value 값이 AgeType안에만 있으면 true를 반환하고 없으면 false를 반환한다.
export const isAgeType = (value: unknown): value is AgeType =>
  typeof value === 'string' && AGE_OPTIONS.some((option) => option.value === value);

// 기능: 사용자가 넣은 value 값이 AgeLabel안에만 있으면 true를 반환하고 없으면 false를 반환한다.
export const isAgeLabel = (value: unknown): value is AgeLabel =>
  typeof value === 'string' && AGE_OPTIONS.some((option) => option.label === value);

// 기능: KoreanAge에 값에 따라 분류를 해놓고 것이고 KoreanAge 값에 따라서 반환 값이 달라진다.
export const getAgeTypeFromKoreanAge = (koreanAge: number): AgeType => {
  const normalizedAge = Number.isFinite(koreanAge) ? koreanAge : 0;

  if (normalizedAge <= 8) return 'BABY';
  if (normalizedAge <= 13) return 'AGE_9_13';
  if (normalizedAge <= 16) return 'AGE_14_16';
  if (normalizedAge <= 19) return 'AGE_17_19';
  if (normalizedAge <= 24) return 'AGE_20_24';
  return 'ADULT';
};
