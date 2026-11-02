import { toHourMinute } from '@shared/lib/formatTime';
import type { GroupUsage, PcUsage, UsageGroup, UsageRecord, UsageStatus } from '../model/types';

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

export const toUsageGroups = ({ pc, pingPong, sing }: UsageStatus): UsageGroup[] => [
  { id: 'pc', label: '인터넷', records: pc.map(toPcRecord) },
  { id: 'pingPong', label: '탁구', records: pingPong ? [toGroupRecord(pingPong, '탁구')] : [] },
  { id: 'sing', label: '노래방', records: sing ? [toGroupRecord(sing, '노래방')] : [] },
];
