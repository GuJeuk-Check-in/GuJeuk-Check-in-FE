export const AGE_OPTIONS = [
  { value: 'BABY', label: '0~8세' },
  { value: 'AGE_9_13', label: '9~13세' },
  { value: 'AGE_14_16', label: '14~16세' },
  { value: 'AGE_17_19', label: '17~19세' },
  { value: 'AGE_20_24', label: '20~24세' },
  { value: 'ADULT', label: '성인' },
] as const;

export type AgeType = (typeof AGE_OPTIONS)[number]['value'];
export type AgeLabel = (typeof AGE_OPTIONS)[number]['label'];

export const AGE_LABELS: readonly AgeLabel[] = AGE_OPTIONS.map(
  ({ label }) => label
);

export const getAgeTypeByLabel = (label: string): AgeType | undefined =>
  AGE_OPTIONS.find((option) => option.label === label)?.value;

export const getAgeLabel = (age: AgeType): string =>
  AGE_OPTIONS.find((option) => option.value === age)?.label ?? age;

export const isAgeType = (value: unknown): value is AgeType =>
  AGE_OPTIONS.some((option) => option.value === value);

export const isAgeLabel = (value: unknown): value is AgeLabel =>
  AGE_OPTIONS.some((option) => option.label === value);

export const getAgeTypeFromKoreanAge = (koreanAge: number): AgeType => {
  if (koreanAge <= 8) return 'BABY';
  if (koreanAge <= 13) return 'AGE_9_13';
  if (koreanAge <= 16) return 'AGE_14_16';
  if (koreanAge <= 19) return 'AGE_17_19';
  if (koreanAge <= 24) return 'AGE_20_24';
  return 'ADULT';
};
