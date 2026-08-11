import {
  MonthOptionButton,
  MonthSwitcher,
} from './ReportMonthSwitcher.styles';

const FIRST_REPORT_MONTH = 1;
const LAST_REPORT_MONTH = 12;

type MonthPosition = 'previous' | 'active' | 'next';

type ReportMonthSwitcherProps = {
  readonly selectedMonth: number;
  readonly isLoading: boolean;
  readonly onMonthChange: (month: number) => void;
};

const getVisibleMonths = (selectedMonth: number) => {
  const firstMonth = Math.max(FIRST_REPORT_MONTH, selectedMonth - 1);
  const lastMonth = Math.min(LAST_REPORT_MONTH, selectedMonth + 1);

  return Array.from(
    { length: lastMonth - firstMonth + 1 },
    (_, index) => firstMonth + index
  );
};

const getMonthPosition = (
  month: number,
  selectedMonth: number
): MonthPosition => {
  if (month < selectedMonth) {
    return 'previous';
  }

  if (month > selectedMonth) {
    return 'next';
  }

  return 'active';
};

export const ReportMonthSwitcher = ({
  selectedMonth,
  isLoading,
  onMonthChange,
}: ReportMonthSwitcherProps) => {
  return (
    <MonthSwitcher aria-label="월별 실적 월 선택" role="group">
      {getVisibleMonths(selectedMonth).map((month) => {
        const monthPosition = getMonthPosition(month, selectedMonth);
        const isSelected = monthPosition === 'active';

        return (
          <MonthOptionButton
            key={month}
            aria-label={`${month}월 월별 실적 조회`}
            aria-pressed={isSelected}
            data-position={monthPosition}
            disabled={isLoading || isSelected}
            onClick={() => onMonthChange(month)}
            type="button"
          >
            {month}월
          </MonthOptionButton>
        );
      })}
    </MonthSwitcher>
  );
};
