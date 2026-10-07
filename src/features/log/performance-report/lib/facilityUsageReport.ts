/*
  코드 주석 작성일: 2026/10/5
  작성자: 박민건
  이 파일의 전체적인 기능: 서버에서 받아온 가동일수와 평균가동률을 받고 화면에 행렬로 알맞게 가공하는 파일이다.
*/

import type { FacilityUsageResponse } from "@entities/log";
import { type FacilityUsageMonthKey } from "@entities/log";
import { formatCount, formatRate } from "./visitPerformanceReport";

export const FACILITY_CAPACITY = 75;

//기능: 월에 따른 key와 label을 FACILITY_USAGE_COLUMNS라는 객체로 묶는다.
export const FACILITY_USAGE_COLUMNS = [
  { key: "total", label: "계" },
  { key: "january", label: "1월" },
  { key: "february", label: "2월" },
  { key: "march", label: "3월" },
  { key: "april", label: "4월" },
  { key: "may", label: "5월" },
  { key: "june", label: "6월" },
  { key: "july", label: "7월" },
  { key: "august", label: "8월" },
  { key: "september", label: "9월" },
  { key: "october", label: "10월" },
  { key: "november", label: "11월" },
  { key: "december", label: "12월" },
] as const satisfies readonly {
  readonly key: "total" | FacilityUsageMonthKey;
  readonly label: string;
}[];

//기능: 통계 표의 한 행을 나타내는 타입으로 label과 해당 항목의 계 및 월별 통계 수치들을 담은 values로 이루어져 있다.
export type FacilityUsageTableRow = {
  readonly label: string;
  readonly values: readonly string[];
};

const EMPTY_VALUE = "-";

//기능: 데이터 값이 null(없음)일 때는 대시(-) 문자로 보여주고, 값이 존재할 때는 콤마나 단위가 붙은 숫자 형태로 알맞게 가공된다.
const formatNullableCount = (value: number | null) =>
  value === null ? EMPTY_VALUE : formatCount(value);

const formatNullableRate = (value: number | null) =>
  value === null ? EMPTY_VALUE : formatRate(value);

//기능: 서버 통계 데이터(data)를 넘겨받아 가동일수 행과 평균가동률 행을 각각 생성하고 FACILITY_USAGE_COLUMNS의 순서에 맞춰서 배열 데이터를 매핑하고 FacilityUsageTableRow로 변환해 리턴한다.
export const createFacilityUsageRows = (
  data: FacilityUsageResponse,
): readonly FacilityUsageTableRow[] => [
  {
    label: "가동일수(일)",
    values: FACILITY_USAGE_COLUMNS.map(({ key }) =>
      formatNullableCount(data[key].opDate),
    ),
  },
  {
    label: "평균가동률(%)",
    values: FACILITY_USAGE_COLUMNS.map(({ key }) =>
      formatNullableRate(data[key].avgRate),
    ),
  },
];
