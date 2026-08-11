import styled from '@emotion/styled';

export const Overlay = styled.div`
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

export const ModalContent = styled.div`
  width: min(96vw, 90rem);
  min-width: 78rem;
`;

export const ActionBar = styled.div`
  display: grid;
  grid-template-columns: minmax(16rem, 1fr) auto auto;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  color: #ffffff;

  @media (max-width: 80rem) {
    position: sticky;
    left: 0;
    grid-template-columns: 1fr;
    width: calc(100vw - 4rem);
  }
`;

export const HelperText = styled.p`
  margin: 0;
  font-size: 0.95rem;
  word-break: keep-all;
`;

export const ActionButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

const ActionButton = styled.button`
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.8rem 1.2rem;
  white-space: nowrap;
`;

export const PrimaryButton = styled(ActionButton)`
  background-color: #0f50a0;
  color: #ffffff;
`;

export const SecondaryButton = styled(ActionButton)`
  background-color: #ffffff;
  color: #1f2937;
`;

export const ReportPage = styled.article`
  background-color: #ffffff;
  color: #000000;
  margin: 0 auto;
  min-width: 78rem;
  padding: 2.4rem 2.8rem 2.6rem;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', '맑은 고딕', sans-serif;
`;

export const ReportTitle = styled.h1`
  margin: 0 0 1.8rem;
  font-size: clamp(2rem, 3vw, 3rem);
  font-weight: 800;
  line-height: 1.2;
  text-align: center;
  text-decoration: underline;
  text-underline-offset: 0.14em;
`;

export const SectionLine = styled.p`
  margin: 0 0 0.95rem;
  font-size: 1.45rem;
  font-weight: 700;
`;

export const SubSectionLine = styled.p`
  margin: 1.3rem 0 0.75rem 2rem;
  font-size: 1.28rem;
  font-weight: 700;
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
`;

const BaseCell = styled.th`
  border: 1.5px solid #555555;
  padding: 0.28rem 0.35rem;
  text-align: center;
  vertical-align: middle;
  word-break: keep-all;
`;

export const PerformanceTable = styled.table`
  width: 100%;
  min-width: 72rem;
  border-collapse: collapse;
  table-layout: fixed;
  border: 2px solid #555555;
  font-size: 1.35rem;

  .category-column {
    width: 10.5%;
  }

  .total-column {
    width: 8.75%;
  }

  .count-column {
    width: 9%;
  }
`;

export const UsageTable = styled.table`
  width: 100%;
  min-width: 72rem;
  border-collapse: collapse;
  table-layout: fixed;
  border: 2px solid #555555;
  font-size: 1.35rem;

  .category-column {
    width: 15%;
  }

  .value-column {
    width: 6.55%;
  }
`;

export const HeaderCell = styled(BaseCell)`
  background-color: #f1f1f1;
  font-size: 1.42rem;
  font-weight: 800;
`;

export const HeaderDividerCell = styled(HeaderCell)`
  border-bottom: 4px double #555555;
`;

export const RowHeader = styled(BaseCell)`
  font-size: 1.35rem;
  font-weight: 800;
`;

export const ValueCell = styled.td`
  border: 1.5px solid #555555;
  height: 2.55rem;
  padding: 0.22rem 0.3rem;
  font-size: 1.34rem;
  line-height: 1.1;
  text-align: center;
  vertical-align: middle;
`;

export const UsageValueCell = styled(ValueCell)`
  color: #443cff;
  font-size: 1.45rem;

  &.empty {
    color: #333333;
  }
`;

export const PRINT_PAGE_STYLE = `
  @page {
    size: A4 landscape;
    margin: 10mm;
  }

  @media print {
    body * {
      visibility: hidden !important;
    }

    #operation-status-report-preview,
    #operation-status-report-preview * {
      visibility: visible !important;
    }

    #operation-status-report-preview {
      position: absolute;
      inset: 0 auto auto 0;
      width: 100%;
      box-shadow: none;
      padding: 0;
    }
  }
`;
