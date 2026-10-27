export const formatDateKoreanPadded = (date: string) => {
  const [year, month, day] = date.split('-');
  return `${year}년 ${month.padStart(2, '0')}월 ${day.padStart(2, '0')}일`;
};
