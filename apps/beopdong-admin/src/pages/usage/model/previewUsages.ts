import type { UsageRecord } from '@entities/usage';

export const previewUsageGroups: UsageRecord[][] = [
  [
    { id: 1, userName: '김정욱', detail: '01번', purposeName: '인터넷', startTime: '14:20', endTime: '15:00', remainingMinutes: 5 },
    { id: 2, userName: '김하늘', detail: '02번', purposeName: '인터넷', startTime: '14:30', endTime: '15:10', remainingMinutes: 15 },
    { id: 3, userName: '정시우', detail: '05번', purposeName: '인터넷', startTime: '14:40', endTime: '15:20', remainingMinutes: 25 },
  ],
  [
    { id: 4, userName: '박서연', detail: '2명', purposeName: '포켓볼 탁구', startTime: '14:40', endTime: '15:20', remainingMinutes: 34 },
  ],
  [
    { id: 5, userName: '이도윤', detail: '2명', purposeName: '노래방', startTime: '14:50', endTime: '15:20', remainingMinutes: 25 },
  ],
];
