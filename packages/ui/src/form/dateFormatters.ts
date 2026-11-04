export const parseCalendarDate = (value: string | Date | null): Date | null => {
  if (!value) return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  const compact = value.replace(/[^\d]/g, '');
  if (compact.length === 8) {
    const year = Number(compact.slice(0, 4));
    const month = Number(compact.slice(4, 6));
    const day = Number(compact.slice(6, 8));
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
      ? date : null;
  }
  const normalized = value.replace('년', '-').replace('월', '-').replace('일', '').replace(/\s/g, '');
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const formatCalendarDate = (date: Date): string =>
  `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

export const formatDateToISOString = (date: Date): string =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export const formatDateToKoreanDate = (date: Date): string =>
  formatDateToISOString(date).replace(/(\d{4})-(\d{2})-(\d{2})/, '$1년$2월$3일');
