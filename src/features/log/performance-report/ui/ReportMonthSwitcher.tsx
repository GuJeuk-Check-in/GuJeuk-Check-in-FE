/*
  코드 주석 작성일: 2026/10/5
  작성자: 박민건
  이 파일의 전체적인 기능: 사용자가 선택한 월을 중심으로 이전 달, 현재 달, 다음 달의 버튼만 화면에 가동적으로 노출하고, 원하는 달을 클릭하면 데이터를 새로 불러오도록 이벤트를 전달하는 흐름이다.
*/

import { MonthOptionButton, MonthSwitcher } from "./ReportMonthSwitcher.styles";

const FIRST_REPORT_MONTH = 1;
const LAST_REPORT_MONTH = 12;

type MonthPosition = "previous" | "active" | "next";

type ReportMonthSwitcherProps = {
  readonly selectedMonth: number;
  readonly isLoading: boolean;
  readonly onMonthChange: (month: number) => void;
};

//기능: 선택한 달과 앞뒤 달을 화면에 표시할 월 목록으로 만든다
const getVisibleMonths = (selectedMonth: number) => {
  const firstMonth = Math.max(FIRST_REPORT_MONTH, selectedMonth - 1);
  const lastMonth = Math.min(LAST_REPORT_MONTH, selectedMonth + 1);

  return Array.from(
    { length: lastMonth - firstMonth + 1 },
    (_, index) => firstMonth + index,
  );
};

//기능: 해당 월이 선택한 월보다 이전인지, 이후인지, 같은 월인지 판단한다
const getMonthPosition = (
  month: number,
  selectedMonth: number,
): MonthPosition => {
  if (month < selectedMonth) {
    return "previous";
  }

  if (month > selectedMonth) {
    return "next";
  }

  return "active";
};

//기능:  월 선택 버튼을 표시하고, 다른 월을 클릭하면 변경 이벤트를 전달한다
export const ReportMonthSwitcher = ({
  selectedMonth,
  isLoading,
  onMonthChange,
}: ReportMonthSwitcherProps) => {
  return (
    <MonthSwitcher aria-label="월별 실적 월 선택" role="group">
      {getVisibleMonths(selectedMonth).map((month) => {
        const monthPosition = getMonthPosition(month, selectedMonth);
        const isSelected = monthPosition === "active";
        const isDisabled = isLoading || isSelected;

        return (
          <MonthOptionButton
            key={month}
            aria-disabled={isDisabled}
            aria-label={`${month}월 월별 실적 조회`}
            aria-pressed={isSelected}
            data-position={monthPosition}
            onClick={() => {
              if (isDisabled) {
                return;
              }

              onMonthChange(month);
            }}
            type="button"
          >
            {month}월
          </MonthOptionButton>
        );
      })}
    </MonthSwitcher>
  );
};
