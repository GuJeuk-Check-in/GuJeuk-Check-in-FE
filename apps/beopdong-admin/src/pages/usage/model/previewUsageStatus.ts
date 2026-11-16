import type { UsageStatusResponse } from '@entities/usage';

export const previewUsageStatus: UsageStatusResponse = {
  usageStatus: {
    pc: [
      { id: 1, seat: 1, name: '김정욱', startTime: '14:20:00', endTime: '15:00:00', purposeRemainTime: 5 },
      { id: 2, seat: 2, name: '김하늘', startTime: '14:30:00', endTime: '15:10:00', purposeRemainTime: 15 },
      { id: 3, seat: 5, name: '정시우', startTime: '14:40:00', endTime: '15:20:00', purposeRemainTime: 25 },
    ],
    pingPong: { id: 4, name: '박서연', count: 2, startTime: '14:40:00', endTime: '15:20:00', purposeRemainTime: 34 },
    sing: { id: 5, name: '이도윤', count: 2, startTime: '14:50:00', endTime: '15:20:00', purposeRemainTime: 25 },
  },
};
