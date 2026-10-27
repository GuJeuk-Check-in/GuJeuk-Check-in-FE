import type { GroupUsage, PcUsage, UsageRecord, UsageStatus } from '../model/types';

const formatTime = (time: string) => time.slice(0, 5);

const toPcRecord = (usage: PcUsage): UsageRecord => ({
  id: usage.id,
  name: usage.name,
  detail: `${String(usage.seat).padStart(2, '0')}번`,
  purposeName: '인터넷',
  startTime: formatTime(usage.startTime),
  endTime: formatTime(usage.endTime),
  purposeRemainTime: usage.purposeRemainTime,
});

const toGroupRecord = (usage: GroupUsage, purposeName: string): UsageRecord => ({
  id: usage.id,
  name: usage.name,
  detail: `${usage.count}명`,
  purposeName,
  startTime: formatTime(usage.startTime),
  endTime: formatTime(usage.endTime),
  purposeRemainTime: usage.purposeRemainTime,
});

export const toUsageGroups = ({ pc, pingPong, sing }: UsageStatus): UsageRecord[][] => [
  pc.map(toPcRecord),
  pingPong ? [toGroupRecord(pingPong, '포켓볼 탁구')] : [],
  sing ? [toGroupRecord(sing, '노래방')] : [],
];
