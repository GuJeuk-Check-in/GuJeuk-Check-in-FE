import { useEffect } from 'react';
import type { FacilityUsageResponse, VisitStatisticsResponse } from '@entities/log';
import {
  createFacilityUsageRows,
  FACILITY_CAPACITY,
  FACILITY_USAGE_COLUMNS,
} from '../lib/facilityUsageReport';
import {
  createUsageRateRow,
  createVisitorCountRow,
  FACILITY_NAME,
  getPerformanceReportFileBaseName,
} from '../lib/visitPerformanceReport';
import {
  ActionBar,
  ActionButtonGroup,
  HeaderCell,
  HeaderDividerCell,
  HelperText,
  ModalContent,
  Overlay,
  PerformanceTable,
  PrimaryButton,
  PRINT_PAGE_STYLE,
  ReportPage,
  ReportTitle,
  RowHeader,
  SecondaryButton,
  SectionLine,
  SubSectionLine,
  TableWrapper,
  UsageTable,
  UsageValueCell,
  ValueCell,
} from './OperationStatusPreviewModal.styles';
import { ReportMonthSwitcher } from './ReportMonthSwitcher';

export type OperationStatusPreviewData = {
  readonly performance: VisitStatisticsResponse;
  readonly facilityUsage: FacilityUsageResponse;
};

type OperationStatusPreviewModalProps = {
  readonly isOpen: boolean;
  readonly data: OperationStatusPreviewData | null;
  readonly selectedMonth: number;
  readonly isMonthLoading: boolean;
  readonly onMonthChange: (month: number) => void;
  readonly onClose: () => void;
};

export const OperationStatusPreviewModal = ({
  isOpen,
  data,
  selectedMonth,
  isMonthLoading,
  onMonthChange,
  onClose,
}: OperationStatusPreviewModalProps) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const style = document.createElement('style');
    style.innerHTML = PRINT_PAGE_STYLE;
    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, [isOpen]);

  if (!isOpen || !data) {
    return null;
  }

  const visitorCountRow = createVisitorCountRow(data.performance);
  const usageRateRow = createUsageRateRow(data.performance);
  const facilityUsageRows = createFacilityUsageRows(data.facilityUsage);
  const reportTitle = `${data.performance.year}년 ${data.performance.month}월 청소년시설 운영 현황`;

  const handlePrint = () => {
    const previousTitle = document.title;
    document.title = getPerformanceReportFileBaseName(data.performance);
    window.print();
    window.setTimeout(() => {
      document.title = previousTitle;
    }, 0);
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContent onClick={(event) => event.stopPropagation()}>
        <ActionBar>
          <HelperText>
            인쇄 화면에서 “PDF로 저장”을 선택하세요.
          </HelperText>
          <ReportMonthSwitcher
            selectedMonth={selectedMonth}
            isLoading={isMonthLoading}
            onMonthChange={onMonthChange}
          />
          <ActionButtonGroup>
            <PrimaryButton onClick={handlePrint}>PDF로 저장/인쇄</PrimaryButton>
            <SecondaryButton onClick={onClose}>닫기</SecondaryButton>
          </ActionButtonGroup>
        </ActionBar>

        <ReportPage id="operation-status-report-preview">
          <ReportTitle>{reportTitle}</ReportTitle>
          <SectionLine>
            1. 시&nbsp;&nbsp;설&nbsp;&nbsp;명 : {FACILITY_NAME}
          </SectionLine>
          <SectionLine>2. 일반현황</SectionLine>
          <SubSectionLine>
            가. 청소년이용률(연간청소년이용자수÷연간전체이용자수×100)
          </SubSectionLine>
          <TableWrapper>
            <PerformanceTable>
              <colgroup>
                <col className="category-column" />
                <col className="total-column" />
                <col span={4} className="count-column" />
                <col className="total-column" />
                <col span={4} className="count-column" />
              </colgroup>
              <thead>
                <tr>
                  <HeaderDividerCell rowSpan={3}>구 분</HeaderDividerCell>
                  <HeaderCell colSpan={5}>누계</HeaderCell>
                  <HeaderCell colSpan={5}>{data.performance.month}월</HeaderCell>
                </tr>
                <tr>
                  <HeaderDividerCell rowSpan={2}>계</HeaderDividerCell>
                  <HeaderCell colSpan={2}>청소년</HeaderCell>
                  <HeaderCell colSpan={2}>기타</HeaderCell>
                  <HeaderDividerCell rowSpan={2}>계</HeaderDividerCell>
                  <HeaderCell colSpan={2}>청소년</HeaderCell>
                  <HeaderCell colSpan={2}>기타</HeaderCell>
                </tr>
                <tr>
                  <HeaderDividerCell>남</HeaderDividerCell>
                  <HeaderDividerCell>여</HeaderDividerCell>
                  <HeaderDividerCell>남</HeaderDividerCell>
                  <HeaderDividerCell>여</HeaderDividerCell>
                  <HeaderDividerCell>남</HeaderDividerCell>
                  <HeaderDividerCell>여</HeaderDividerCell>
                  <HeaderDividerCell>남</HeaderDividerCell>
                  <HeaderDividerCell>여</HeaderDividerCell>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <RowHeader rowSpan={2}>{visitorCountRow.label}</RowHeader>
                  <ValueCell rowSpan={2}>{visitorCountRow.cumulativeTotal}</ValueCell>
                  <ValueCell>{visitorCountRow.cumulativeYouthMale}</ValueCell>
                  <ValueCell>{visitorCountRow.cumulativeYouthFemale}</ValueCell>
                  <ValueCell>{visitorCountRow.cumulativeOtherMale}</ValueCell>
                  <ValueCell>{visitorCountRow.cumulativeOtherFemale}</ValueCell>
                  <ValueCell rowSpan={2}>{visitorCountRow.monthlyTotal}</ValueCell>
                  <ValueCell>{visitorCountRow.monthlyYouthMale}</ValueCell>
                  <ValueCell>{visitorCountRow.monthlyYouthFemale}</ValueCell>
                  <ValueCell>{visitorCountRow.monthlyOtherMale}</ValueCell>
                  <ValueCell>{visitorCountRow.monthlyOtherFemale}</ValueCell>
                </tr>
                <tr>
                  <ValueCell colSpan={2}>
                    {visitorCountRow.cumulativeYouthTotal}
                  </ValueCell>
                  <ValueCell colSpan={2}>
                    {visitorCountRow.cumulativeOtherTotal}
                  </ValueCell>
                  <ValueCell colSpan={2}>{visitorCountRow.monthlyYouthTotal}</ValueCell>
                  <ValueCell colSpan={2}>{visitorCountRow.monthlyOtherTotal}</ValueCell>
                </tr>
                <tr>
                  <RowHeader>{usageRateRow.label}</RowHeader>
                  <ValueCell>{usageRateRow.cumulativeTotal}</ValueCell>
                  <ValueCell colSpan={2}>
                    {usageRateRow.cumulativeYouthTotal}
                  </ValueCell>
                  <ValueCell colSpan={2}>
                    {usageRateRow.cumulativeOtherTotal}
                  </ValueCell>
                  <ValueCell>{usageRateRow.monthlyTotal}</ValueCell>
                  <ValueCell colSpan={2}>{usageRateRow.monthlyYouthTotal}</ValueCell>
                  <ValueCell colSpan={2}>{usageRateRow.monthlyOtherTotal}</ValueCell>
                </tr>
              </tbody>
            </PerformanceTable>
          </TableWrapper>

          <SubSectionLine>
            나. 시설 가동률(월간전체이용자수÷(수용정원:{FACILITY_CAPACITY}명×가동일수)×100)
          </SubSectionLine>
          <TableWrapper>
            <UsageTable>
              <colgroup>
                <col className="category-column" />
                {FACILITY_USAGE_COLUMNS.map((column) => (
                  <col key={column.key} className="value-column" />
                ))}
              </colgroup>
              <thead>
                <tr>
                  <HeaderCell>구분</HeaderCell>
                  {FACILITY_USAGE_COLUMNS.map((column) => (
                    <HeaderCell key={column.key}>{column.label}</HeaderCell>
                  ))}
                </tr>
              </thead>
              <tbody>
                {facilityUsageRows.map((row) => (
                  <tr key={row.label}>
                    <RowHeader>{row.label}</RowHeader>
                    {row.values.map((value, index) => (
                      <UsageValueCell
                        key={FACILITY_USAGE_COLUMNS[index].key}
                        className={value === '-' ? 'empty' : undefined}
                      >
                        {value}
                      </UsageValueCell>
                    ))}
                  </tr>
                ))}
              </tbody>
            </UsageTable>
          </TableWrapper>
        </ReportPage>
      </ModalContent>
    </Overlay>
  );
};
