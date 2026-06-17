import { useEffect } from 'react';
import styled from '@emotion/styled';
import type { VisitStatisticsResponse } from '@entities/visit';
import {
  createUsageRateRow,
  createVisitorCountRow,
  FACILITY_NAME,
  getPerformanceReportFileBaseName,
} from '../lib/visitPerformanceReport';

interface VisitPerformancePreviewModalProps {
  isOpen: boolean;
  data: VisitStatisticsResponse | null;
  onClose: () => void;
}

export const VisitPerformancePreviewModal = ({
  isOpen,
  data,
  onClose,
}: VisitPerformancePreviewModalProps) => {
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

  const visitorCountRow = createVisitorCountRow(data);
  const usageRateRow = createUsageRateRow(data);
  const reportTitle = `${data.year}년 ${data.month}월 청소년시설 운영 현황`;
  const fileBaseName = getPerformanceReportFileBaseName(data);

  const handlePrint = () => {
    const previousTitle = document.title;
    document.title = fileBaseName;
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
            PDF 저장은 인쇄 화면에서 “PDF로 저장”을 선택하세요.
          </HelperText>
          <ActionButtonGroup>
            <PrimaryButton onClick={handlePrint}>PDF로 저장/인쇄</PrimaryButton>
            <SecondaryButton onClick={onClose}>닫기</SecondaryButton>
          </ActionButtonGroup>
        </ActionBar>

        <ReportPage id="visit-performance-report-preview">
          <ReportTitle>{reportTitle}</ReportTitle>
          <SectionLine>
            1. 시&nbsp;&nbsp;설&nbsp;&nbsp;명 : {FACILITY_NAME}
          </SectionLine>
          <SectionLine>2. 일반현황</SectionLine>
          <SubSectionLine>
            가. 청소년이용률 (연간청소년이용자수÷연간전체이용자수×100)
          </SubSectionLine>

          <TableWrapper>
            <ReportTable>
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
                  <HeaderCell colSpan={5}>{data.month}월</HeaderCell>
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
                  <ValueCell rowSpan={2}>
                    {visitorCountRow.cumulativeTotal}
                  </ValueCell>
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
                  <ValueCell colSpan={2}>
                    {visitorCountRow.monthlyYouthTotal}
                  </ValueCell>
                  <ValueCell colSpan={2}>
                    {visitorCountRow.monthlyOtherTotal}
                  </ValueCell>
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
                  <ValueCell colSpan={2}>
                    {usageRateRow.monthlyYouthTotal}
                  </ValueCell>
                  <ValueCell colSpan={2}>
                    {usageRateRow.monthlyOtherTotal}
                  </ValueCell>
                </tr>
              </tbody>
            </ReportTable>
          </TableWrapper>
        </ReportPage>
      </ModalContent>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.55);
  padding: 2rem;
`;

const ModalContent = styled.div`
  width: min(96vw, 90rem);
`;

const ActionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  color: #ffffff;
`;

const HelperText = styled.p`
  margin: 0;
  font-size: 0.95rem;
`;

const ActionButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ActionButton = styled.button`
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.8rem 1.2rem;
`;

const PrimaryButton = styled(ActionButton)`
  background-color: #0f50a0;
  color: #ffffff;
`;

const SecondaryButton = styled(ActionButton)`
  background-color: #ffffff;
  color: #1f2937;
`;

const ReportPage = styled.article`
  background-color: #ffffff;
  color: #000000;
  margin: 0 auto;
  padding: 2.5rem 3rem 3rem;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', '맑은 고딕', sans-serif;
`;

const ReportTitle = styled.h1`
  margin: 0 0 2rem;
  border-bottom: 0.25rem solid #102a43;
  font-size: clamp(1.8rem, 3.2vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.06em;
  line-height: 1.2;
  text-align: center;
`;

const SectionLine = styled.p`
  margin: 0 0 1rem;
  font-size: 1.55rem;
  font-weight: 700;
`;

const SubSectionLine = styled.p`
  margin: 1.4rem 0 2rem 2rem;
  font-size: 1.4rem;
  font-weight: 700;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const ReportTable = styled.table`
  width: 100%;
  min-width: 76rem;
  border-collapse: collapse;
  table-layout: fixed;
  border: 2px solid #555555;
  font-size: 1.55rem;

  .category-column {
    width: 10.5%;
  }

  .total-column {
    width: 8.8%;
  }

  .count-column {
    width: 8.15%;
  }
`;

const BaseCell = styled.th`
  border: 1.5px solid #555555;
  padding: 0.35rem 0.4rem;
  text-align: center;
  vertical-align: middle;
  word-break: keep-all;
`;

const HeaderCell = styled(BaseCell)`
  background-color: #f1f1f1;
  font-weight: 800;
  height: 2.8rem;
  font-size: 1.7rem;
`;

const HeaderDividerCell = styled(HeaderCell)`
  border-bottom: 4px double #555555;
`;

const RowHeader = styled(BaseCell)`
  font-weight: 800;
  font-size: 1.75rem;
`;

const ValueCell = styled.td`
  border: 1.5px solid #555555;
  height: 3.1rem;
  padding: 0.3rem 0.4rem;
  text-align: center;
  vertical-align: middle;
  font-size: 1.75rem;
  line-height: 1.1;
`;

const PRINT_PAGE_STYLE = `
  @page {
    size: A4 landscape;
    margin: 12mm;
  }

  @media print {
    body * {
      visibility: hidden !important;
    }

    #visit-performance-report-preview,
    #visit-performance-report-preview * {
      visibility: visible !important;
    }

    #visit-performance-report-preview {
      position: absolute;
      inset: 0 auto auto 0;
      width: 100%;
      box-shadow: none;
      padding: 0;
    }
  }
`;
