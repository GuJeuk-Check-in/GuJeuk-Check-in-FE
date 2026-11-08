import type { UsageHistoryDetail } from '../model/types';
import { getHeadcountError } from './headcount';

const isDetailEmpty = (detail: UsageHistoryDetail): boolean =>
  detail.kind === 'pc' && (!detail.seat || !detail.usePurpose.trim());

export const validateUsageHistoryDetail = (detail: UsageHistoryDetail): string | null => {
  const isEmpty = !detail.name.trim() || !detail.startTime || !detail.endTime || isDetailEmpty(detail);

  if (isEmpty) return '모든 필수 필드를 입력해주세요.';

  if (detail.kind === 'group') {
    const headcountError = getHeadcountError(String(detail.count));
    if (headcountError) return headcountError;
  }

  if (detail.endTime < detail.startTime) return '종료 시간은 시작 시간보다 빠를 수 없습니다.';

  return null;
};
