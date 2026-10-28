import type { UsageHistoryDetail } from '../model/types';

export const validateUsageHistoryDetail = (detail: UsageHistoryDetail): string | null => {
  const isEmpty =
    !detail.name.trim() ||
    !detail.startTime ||
    !detail.endTime ||
    (detail.count !== null && !detail.count) ||
    (detail.usePurpose !== null && !detail.usePurpose.trim()) ||
    (detail.seat !== null && !detail.seat);

  return isEmpty ? '모든 필수 필드를 입력해주세요.' : null;
};
