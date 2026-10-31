import type { UsageHistoryDetail } from '@entities/usage';

export const previewUsageHistoryDetails: Readonly<Record<number, UsageHistoryDetail>> = {
  1: { purpose: 3, name: '김하늘', visitDate: '2011-03-12', usePurpose: null, startTime: '12:40:00', endTime: '13:20:00', seat: null, count: 2 },
  2: { purpose: 3, name: '김하늘', visitDate: '2011-03-12', usePurpose: null, startTime: '12:40:00', endTime: '13:20:00', seat: null, count: 2 },
  3: { purpose: 1, name: '이서준', visitDate: '2011-03-12', usePurpose: '자료 검색', startTime: '14:00:00', endTime: '14:40:00', seat: 3, count: null },
  4: { purpose: 2, name: '박서연', visitDate: '2011-03-11', usePurpose: null, startTime: '15:10:00', endTime: '15:50:00', seat: null, count: 3 },
  5: { purpose: 3, name: '김하늘', visitDate: '2011-03-11', usePurpose: null, startTime: '12:40:00', endTime: '13:20:00', seat: null, count: 2 },
  6: { purpose: 1, name: '정시우', visitDate: '2011-03-10', usePurpose: '자료 검색', startTime: '16:00:00', endTime: '16:40:00', seat: 5, count: null },
};
