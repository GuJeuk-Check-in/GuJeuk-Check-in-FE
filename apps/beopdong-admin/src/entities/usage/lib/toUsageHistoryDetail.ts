import type {
  UsageHistoryDetail,
  UsageHistoryDetailPatch,
  UsageHistoryDetailResponse,
} from '../model/types';

export const toUsageHistoryDetail = ({
  seat,
  count,
  usePurpose,
  ...base
}: UsageHistoryDetailResponse): UsageHistoryDetail =>
  seat !== null
    ? { ...base, kind: 'pc', seat, usePurpose: usePurpose ?? '' }
    : { ...base, kind: 'group', count: count ?? 0 };

export const applyUsageHistoryPatch = (
  detail: UsageHistoryDetail,
  patch: UsageHistoryDetailPatch,
): UsageHistoryDetail => ({ ...detail, ...patch }) as UsageHistoryDetail;
