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

// 공백 제거 및 소문자 변환으로 검색어 정규화
const normalizeSearchText = (value: string) =>
  value.trim().replace(/\s+/g, '').toLowerCase();

// 문자열을 한글 초성 문자열로 변환 (예: "홍길동" -> "ㅎㄱㄷ")
export const getKoreanInitials = (value: string) =>
  Array.from(normalizeSearchText(value))
    .map((char) => {
      const code = char.charCodeAt(0);

      // 한글 완성형 음절이 아니면 그대로 반환
      if (code < HANGUL_START_CODE || code > HANGUL_END_CODE) {
        return char;
      }

      // 유니코드 코드값으로 초성 인덱스 계산
      const initialIndex = Math.floor(
        (code - HANGUL_START_CODE) / HANGUL_SYLLABLE_COUNT
      );

      return KOREAN_INITIALS[initialIndex];
    })
    .join('');

// 완전한 텍스트 일치 또는 초성 일치로 검색어와 대상 문자열 매칭
export const matchesKoreanSearch = (target: string, keyword: string) => {
  const normalizedTarget = normalizeSearchText(target);
  const normalizedKeyword = normalizeSearchText(keyword);

  // 검색어가 비어있으면 전체 매칭 처리
  if (!normalizedKeyword) {
    return true;
  }

  return (
    normalizedTarget.includes(normalizedKeyword) ||
    getKoreanInitials(normalizedTarget).includes(normalizedKeyword)
  );
};
