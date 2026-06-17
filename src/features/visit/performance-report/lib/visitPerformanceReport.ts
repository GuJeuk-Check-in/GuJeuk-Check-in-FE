import type { VisitStatisticsResponse } from '@entities/visit';

export const FACILITY_NAME = '구즉청소년문화의집';

export const formatCount = (value: number) => value.toLocaleString('ko-KR');

export const formatRate = (value: number) =>
  Number.isInteger(value) ? `${value}` : value.toFixed(1);

export interface VisitPerformanceTableRow {
  label: string;
  cumulativeTotal: string;
  cumulativeYouthMale: string;
  cumulativeYouthFemale: string;
  cumulativeYouthTotal: string;
  cumulativeOtherMale: string;
  cumulativeOtherFemale: string;
  cumulativeOtherTotal: string;
  monthlyTotal: string;
  monthlyYouthMale: string;
  monthlyYouthFemale: string;
  monthlyYouthTotal: string;
  monthlyOtherMale: string;
  monthlyOtherFemale: string;
  monthlyOtherTotal: string;
}

export const createVisitorCountRow = (
  data: VisitStatisticsResponse
): VisitPerformanceTableRow => ({
  label: '이용자수',
  cumulativeTotal: formatCount(data.cumulative.total),
  cumulativeYouthMale: formatCount(data.cumulative.youth.male),
  cumulativeYouthFemale: formatCount(data.cumulative.youth.female),
  cumulativeYouthTotal: formatCount(data.cumulative.youth.total),
  cumulativeOtherMale: formatCount(data.cumulative.other.male),
  cumulativeOtherFemale: formatCount(data.cumulative.other.female),
  cumulativeOtherTotal: formatCount(data.cumulative.other.total),
  monthlyTotal: formatCount(data.monthly.total),
  monthlyYouthMale: formatCount(data.monthly.youth.male),
  monthlyYouthFemale: formatCount(data.monthly.youth.female),
  monthlyYouthTotal: formatCount(data.monthly.youth.total),
  monthlyOtherMale: formatCount(data.monthly.other.male),
  monthlyOtherFemale: formatCount(data.monthly.other.female),
  monthlyOtherTotal: formatCount(data.monthly.other.total),
});

export const createUsageRateRow = (
  data: VisitStatisticsResponse
): VisitPerformanceTableRow => ({
  label: '이용률(%)',
  cumulativeTotal: '100',
  cumulativeYouthMale: '',
  cumulativeYouthFemale: '',
  cumulativeYouthTotal: formatRate(data.cumulative.youth.rate),
  cumulativeOtherMale: '',
  cumulativeOtherFemale: '',
  cumulativeOtherTotal: formatRate(data.cumulative.other.rate),
  monthlyTotal: '100',
  monthlyYouthMale: '',
  monthlyYouthFemale: '',
  monthlyYouthTotal: formatRate(data.monthly.youth.rate),
  monthlyOtherMale: '',
  monthlyOtherFemale: '',
  monthlyOtherTotal: formatRate(data.monthly.other.rate),
});

export const getPerformanceReportFileBaseName = (
  data: VisitStatisticsResponse
) => `${data.year}년_${data.month}월_청소년시설_운영_현황`;
