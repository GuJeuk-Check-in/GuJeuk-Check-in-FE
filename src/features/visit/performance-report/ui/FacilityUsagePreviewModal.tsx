import { useEffect } from 'react';
import type { FacilityUsageResponse } from '@entities/visit';
import {
  createFacilityUsageRows,
  FACILITY_CAPACITY,
  FACILITY_USAGE_COLUMNS,
  getFacilityUsageFileBaseName,
  getLatestUsageMonthLabel,
} from '../lib/facilityUsageReport';
import { FACILITY_NAME } from '../lib/visitPerformanceReport';
import {
  ActionBar,
  ActionButtonGroup,
  HeaderCell,
  HelperText,
  LatestLine,
  ModalContent,
  Overlay,
  PrimaryButton,
  PRINT_PAGE_STYLE,
  ReportPage,
  ReportTable,
  ReportTitle,
  RowHeader,
  SecondaryButton,
  SectionLine,
  SubSectionLine,
  TableWrapper,
  ValueCell,
} from './FacilityUsagePreviewModal.styles';

interface FacilityUsagePreviewModalProps {
  isOpen: boolean;
  data: FacilityUsageResponse | null;
  onClose: () => void;
}

export const FacilityUsagePreviewModal = ({
  isOpen,
  data,
  onClose,
}: FacilityUsagePreviewModalProps) => {
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

  const rows = createFacilityUsageRows(data);
  const latestUsageMonthLabel = getLatestUsageMonthLabel(data);

  const handlePrint = () => {
    const previousTitle = document.title;
    document.title = getFacilityUsageFileBaseName();
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
            인쇄 화면에서 "PDF로 저장"을 선택하세요.
          </HelperText>
          <ActionButtonGroup>
            <PrimaryButton onClick={handlePrint}>PDF로 저장/인쇄</PrimaryButton>
            <SecondaryButton onClick={onClose}>닫기</SecondaryButton>
          </ActionButtonGroup>
        </ActionBar>

        <ReportPage id="facility-usage-report-preview">
          <ReportTitle>청소년시설 운영 현황</ReportTitle>
          <SectionLine>
            1. 시&nbsp;&nbsp;설&nbsp;&nbsp;명 : {FACILITY_NAME}
          </SectionLine>
          <SectionLine>2. 운영 통계 현황</SectionLine>
          <LatestLine>최신 집계 기준: {latestUsageMonthLabel}</LatestLine>
          <SubSectionLine>
            나. 시설 가동률(월간전체이용자수÷(수용정원:{FACILITY_CAPACITY}명×가동일수)×100)
          </SubSectionLine>

          <TableWrapper>
            <ReportTable>
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
                {rows.map((row) => (
                  <tr key={row.label}>
                    <RowHeader>{row.label}</RowHeader>
                    {row.values.map((value, index) => (
                      <ValueCell
                        key={FACILITY_USAGE_COLUMNS[index].key}
                        className={value === '-' ? 'empty' : undefined}
                      >
                        {value}
                      </ValueCell>
                    ))}
                  </tr>
                ))}
              </tbody>
            </ReportTable>
          </TableWrapper>
        </ReportPage>
      </ModalContent>
    </Overlay>
  );
};
