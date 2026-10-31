import { toHourMinute } from '@shared/lib/formatTime';
import type { GroupUsage, PcUsage, UsageRecord, UsageStatus } from '../model/types';

const toPcRecord = (usage: PcUsage): UsageRecord => ({
  id: usage.id,
  name: usage.name,
  detail: `${String(usage.seat).padStart(2, '0')}번`,
  purposeName: '인터넷',
  startTime: toHourMinute(usage.startTime),
  endTime: toHourMinute(usage.endTime),
  purposeRemainTime: usage.purposeRemainTime,
});

const toGroupRecord = (usage: GroupUsage, purposeName: string): UsageRecord => ({
  id: usage.id,
  name: usage.name,
  detail: `${usage.count}명`,
  purposeName,
  startTime: toHourMinute(usage.startTime),
  endTime: toHourMinute(usage.endTime),
  purposeRemainTime: usage.purposeRemainTime,
});

export const toUsageGroups = ({ pc, pingPong, sing }: UsageStatus): UsageRecord[][] => [
  pc.map(toPcRecord),
  pingPong ? [toGroupRecord(pingPong, '포켓볼 탁구')] : [],
  sing ? [toGroupRecord(sing, '노래방')] : [],
];
