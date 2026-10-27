import type { UsageHistoryRecord } from '@entities/usage';

export const previewUsageHistory: readonly UsageHistoryRecord[] = [
  { id: 1, name: '김하늘', detail: '2명', purposeName: '탁구', startTime: '12:40', endTime: '13:20', visitDate: '2011-03-12' },
  { id: 2, name: '김하늘', detail: '2명', purposeName: '탁구', startTime: '12:40', endTime: '13:20', visitDate: '2011-03-12' },
  { id: 3, name: '이서준', detail: '03번', purposeName: '인터넷', startTime: '14:00', endTime: '14:40', visitDate: '2011-03-12' },
  { id: 4, name: '박서연', detail: '3명', purposeName: '노래방', startTime: '15:10', endTime: '15:50', visitDate: '2011-03-11' },
  { id: 5, name: '김하늘', detail: '2명', purposeName: '탁구', startTime: '12:40', endTime: '13:20', visitDate: '2011-03-11' },
  { id: 6, name: '정시우', detail: '05번', purposeName: '인터넷', startTime: '16:00', endTime: '16:40', visitDate: '2011-03-10' },
];
