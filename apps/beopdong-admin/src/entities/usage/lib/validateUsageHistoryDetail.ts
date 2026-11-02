import type { UsageHistoryDetail } from '../model/types';

const isDetailEmpty = (detail: UsageHistoryDetail): boolean =>
  detail.kind === 'pc' ? !detail.seat || !detail.usePurpose.trim() : !detail.count;

export const validateUsageHistoryDetail = (detail: UsageHistoryDetail): string | null => {
  const isEmpty = !detail.name.trim() || !detail.startTime || !detail.endTime || isDetailEmpty(detail);

  if (isEmpty) return '모든 필수 필드를 입력해주세요.';

  if (detail.endTime < detail.startTime) return '종료 시간은 시작 시간보다 빠를 수 없습니다.';

  return null;
};
