/*
  코드 주석 작성일: 2026/10/5
  작성자: 박민건
  이 파일의 전체적인 기능: 운영 현황 보고서용 테이블에 들어가 이용자 수와 이용률 행의 데이터 양식을 서버에 보낼 수 있게 가공한 파일이다.
*/


import type { VisitStatisticsResponse } from '@entities/log';

export const FACILITY_NAME = '구즉청소년문화의집';

export const formatCount = (value: number) => value.toLocaleString('ko-KR');

export const formatRate = (value: number) =>
  Number.isInteger(value) ? `${value}` : value.toFixed(1);

//기능: 서버에 보낼 데이터의 양식을 정의해 놓는다.
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

//기능: 위 데이터 양식을 이용해 이용자수의 통계 데이터를 행으로 데이터를 생성한다.
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

//기능: 위 데이터 양식을 이용률통계 데이터를 행으로 데이터를 생성한다.
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

//기능: 연도(year)와 월(month) 정보를 추출하여 엑셀이나 PDF 등 보고서 파일을 다운로드할 때 사용할 기본 파일 이름을 생성한다.
export const getPerformanceReportFileBaseName = (
  data: VisitStatisticsResponse
) => `${data.year}년_${data.month}월_청소년시설_운영_현황`;
