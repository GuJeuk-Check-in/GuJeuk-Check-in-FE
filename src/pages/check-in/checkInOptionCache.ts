import type { PurposeResponse } from '@entities/purpose';
import type { ResidenceResponse } from '@entities/residence';

const PURPOSE_CACHE_KEY = 'gujeuk:last-success-purposes';
const RESIDENCE_CACHE_KEY = 'gujeuk:last-success-residences';

const DEFAULT_PURPOSES: readonly PurposeResponse[] = [
  { id: -1, purpose: '시설 이용' },
];
const DEFAULT_RESIDENCES: readonly ResidenceResponse[] = [
  { id: -1, residence: '기타 지역' },
];

const isRecordObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const readArray = <T>(
  key: string,
  isItem: (value: unknown) => value is T
): readonly T[] => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return [];

    const parsed: unknown = JSON.parse(cached);
    return Array.isArray(parsed) ? parsed.filter(isItem) : [];
  } catch {
    return [];
  }
};

const writeArray = (key: string, values: readonly unknown[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(values));
  } catch {
    return;
  }
};

const isPurpose = (value: unknown): value is PurposeResponse =>
  isRecordObject(value) &&
  typeof value.id === 'number' &&
  typeof value.purpose === 'string';

const isResidence = (value: unknown): value is ResidenceResponse =>
  isRecordObject(value) &&
  typeof value.id === 'number' &&
  typeof value.residence === 'string';

export const readPurposeCacheOrEmpty = (): readonly PurposeResponse[] =>
  readArray(PURPOSE_CACHE_KEY, isPurpose);

export const readPurposeCacheOrDefaults = (): readonly PurposeResponse[] => {
  const cached = readArray(PURPOSE_CACHE_KEY, isPurpose);
  return cached.length > 0 ? cached : DEFAULT_PURPOSES;
};

export const writePurposeCache = (values: readonly PurposeResponse[]): void =>
  writeArray(PURPOSE_CACHE_KEY, values);

export const readResidenceCacheOrDefaults = (): readonly ResidenceResponse[] => {
  const cached = readArray(RESIDENCE_CACHE_KEY, isResidence);
  return cached.length > 0 ? cached : DEFAULT_RESIDENCES;
};

export const writeResidenceCache = (
  values: readonly ResidenceResponse[]
): void => writeArray(RESIDENCE_CACHE_KEY, values);
