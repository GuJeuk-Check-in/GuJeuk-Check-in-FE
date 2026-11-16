import { toHourMinute } from '@shared/lib/formatTime';
import type { UsageHistoryRecord } from '@entities/usage';
import { previewUsageHistoryDetails } from './previewUsageHistoryDetail';

const PURPOSE_NAMES: Readonly<Record<number, string>> = { 1: '인터넷', 2: '노래방', 3: '탁구' };

export const previewUsageHistory: readonly UsageHistoryRecord[] = Object.entries(previewUsageHistoryDetails).map(
  ([id, { purpose, name, visitDate, startTime, endTime, seat, count }]) => ({
    id: Number(id),
    name,
    detail: seat !== null ? `${String(seat).padStart(2, '0')}번` : `${count}명`,
    purposeName: PURPOSE_NAMES[purpose],
    startTime: toHourMinute(startTime),
    endTime: toHourMinute(endTime),
    visitDate,
  }),
);
