import type { FacilityUsageResponse } from '@entities/log';
import { type FacilityUsageMonthKey } from '@entities/log';
import { formatCount, formatRate } from './visitPerformanceReport';

export const FACILITY_CAPACITY = 75;

export const FACILITY_USAGE_COLUMNS = [
  { key: 'total', label: '계' },
  { key: 'january', label: '1월' },
  { key: 'february', label: '2월' },
  { key: 'march', label: '3월' },
  { key: 'april', label: '4월' },
  { key: 'may', label: '5월' },
  { key: 'june', label: '6월' },
  { key: 'july', label: '7월' },
  { key: 'august', label: '8월' },
  { key: 'september', label: '9월' },
  { key: 'october', label: '10월' },
  { key: 'november', label: '11월' },
  { key: 'december', label: '12월' },
] as const satisfies readonly {
  readonly key: 'total' | FacilityUsageMonthKey;
  readonly label: string;
}[];

export type FacilityUsageTableRow = {
  readonly label: string;
  readonly values: readonly string[];
};

const EMPTY_VALUE = '-';

const formatNullableCount = (value: number | null) =>
  value === null ? EMPTY_VALUE : formatCount(value);

const formatNullableRate = (value: number | null) =>
  value === null ? EMPTY_VALUE : formatRate(value);

export const createFacilityUsageRows = (
  data: FacilityUsageResponse
): readonly FacilityUsageTableRow[] => [
  {
    label: '가동일수(일)',
    values: FACILITY_USAGE_COLUMNS.map(({ key }) =>
      formatNullableCount(data[key].opDate)
    ),
  },
  {
    label: '평균가동률(%)',
    values: FACILITY_USAGE_COLUMNS.map(({ key }) =>
      formatNullableRate(data[key].avgRate)
    ),
  },
];
