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

  @media (max-width: 80rem) {
    background-color: #08284a;
    justify-content: flex-start;
  }
`;

export const ModalContent = styled.div`
  width: min(96vw, 90rem);
  min-width: 78rem;
`;

export const ActionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  color: #ffffff;

  @media (max-width: 80rem) {
    position: sticky;
    left: 0;
    align-items: flex-start;
    flex-wrap: wrap;
    width: calc(100vw - 4rem);
  }
`;

export const HelperText = styled.p`
  margin: 0;
  font-size: 0.95rem;
  word-break: keep-all;

  @media (max-width: 80rem) {
    width: 100%;
  }
`;

export const ActionButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;

  @media (max-width: 80rem) {
    width: 100%;
  }
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
  padding: 2.5rem 3rem 3rem;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', '맑은 고딕', sans-serif;
`;

export const ReportTitle = styled.h1`
  margin: 0 0 2rem;
  font-size: clamp(2rem, 3.2vw, 3rem);
  font-weight: 800;
  line-height: 1.2;
  text-align: center;
  text-decoration: underline;
  text-underline-offset: 0.18em;
`;

export const SectionLine = styled.p`
  margin: 0 0 1rem;
  font-size: 1.55rem;
  font-weight: 700;
`;

export const LatestLine = styled.p`
  margin: 0 0 1.4rem 2rem;
  color: #565656;
  font-size: 1.1rem;
  font-weight: 700;
`;

export const SubSectionLine = styled.p`
  margin: 1.4rem 0 0.8rem 2rem;
  font-size: 1.35rem;
  font-weight: 700;
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
`;

export const ReportTable = styled.table`
  width: 100%;
  min-width: 72rem;
  border-collapse: collapse;
  table-layout: fixed;
  border: 2px solid #555555;
  font-size: 1.55rem;

  .category-column {
    width: 15%;
  }

  .value-column {
    width: 6.55%;
  }
`;

const BaseCell = styled.th`
  border: 1.5px solid #555555;
  height: 3.5rem;
  padding: 0.35rem 0.4rem;
  text-align: center;
  vertical-align: middle;
  word-break: keep-all;
`;

export const HeaderCell = styled(BaseCell)`
  background-color: #f1f1f1;
  font-size: 1.75rem;
  font-weight: 800;
`;

export const RowHeader = styled(BaseCell)`
  font-size: 1.75rem;
  font-weight: 800;
`;

export const ValueCell = styled.td`
  border: 1.5px solid #555555;
  height: 3.4rem;
  padding: 0.3rem 0.4rem;
  color: #443cff;
  font-size: 1.85rem;
  line-height: 1.1;
  text-align: center;
  vertical-align: middle;

  &.empty {
    color: #333333;
  }
`;

export const PRINT_PAGE_STYLE = `
  @page {
    size: A4 landscape;
    margin: 12mm;
  }

  @media print {
    body * {
      visibility: hidden !important;
    }

    #facility-usage-report-preview,
    #facility-usage-report-preview * {
      visibility: visible !important;
    }

    #facility-usage-report-preview {
      position: absolute;
      inset: 0 auto auto 0;
      width: 100%;
      box-shadow: none;
      padding: 0;
    }
  }
`;
