const HANGUL_START_CODE = 0xac00;
const HANGUL_END_CODE = 0xd7a3;
const HANGUL_SYLLABLE_COUNT = 588;
const KOREAN_INITIALS = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
] as const;

const normalizeSearchText = (value: string) =>
  value.trim().replace(/\s+/g, '').toLowerCase();

export const getKoreanInitials = (value: string) =>
  Array.from(normalizeSearchText(value))
    .map((char) => {
      const code = char.charCodeAt(0);

      if (code < HANGUL_START_CODE || code > HANGUL_END_CODE) {
        return char;
      }

      const initialIndex = Math.floor(
        (code - HANGUL_START_CODE) / HANGUL_SYLLABLE_COUNT
      );

      return KOREAN_INITIALS[initialIndex];
    })
    .join('');

export const matchesKoreanSearch = (target: string, keyword: string) => {
  const normalizedTarget = normalizeSearchText(target);
  const normalizedKeyword = normalizeSearchText(keyword);

  if (!normalizedKeyword) {
    return true;
  }

  return (
    normalizedTarget.includes(normalizedKeyword) ||
    getKoreanInitials(normalizedTarget).includes(normalizedKeyword)
  );
};
