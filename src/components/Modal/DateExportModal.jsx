import styled from '@emotion/styled';
import { useState, useCallback } from 'react';

const DateExportModal = ({ isVisible, onClose, onExport }) => {
  if (!isVisible) {
    return null;
  }

  const today = new Date();
  const initialYear = today.getFullYear();
  const initialMonth = today.getMonth() + 1;

  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);

  const years = Array.from({ length: 5 }, (_, i) => initialYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleExport = useCallback(() => {
    onExport(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth, onExport]);

  return (
    <ModalOverlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Title>추출할 기간 선택</Title>
        <DateSelectorWrapper>
          <YearSelect
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </YearSelect>
          <Label>년</Label>
          <MonthSelect
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </MonthSelect>
          <Label>월</Label>
        </DateSelectorWrapper>
        <ButtonWrapper>
          <ExportButton onClick={handleExport}>내보내기</ExportButton>
        </ButtonWrapper>
      </Container>
    </ModalOverlay>
  );
};

export default DateExportModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Container = styled.div`
  width: 26.25rem;
  max-width: 90%;
  background-color: white;
  padding: 1.875rem;
  border-radius: 0.75rem;
  box-shadow: 0 0.625rem 1.5625rem rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: bold;
  color: #404040;
  margin-bottom: 1.875rem;
  text-align: center;
`;

const DateSelectorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.25rem;
`;

const Label = styled.span`
  margin: 0 0.3125rem 0 1.25rem;
  font-size: 1rem;
  font-weight: 500;
  color: #404040;
`;

const SelectBase = styled.select`
  padding: 0.5rem 0.75rem;
  border: 0.0625rem solid #ccc;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #404040;
  background-color: white;
  appearance: none;
  cursor: pointer;
  transition: border-color 0.2s;
  text-align-last: center;
  background-repeat: no-repeat;
  background-position: right 0.5rem top 50%;
  background-size: 1rem;
`;

const YearSelect = styled(SelectBase)`
  width: 5.625rem;
`;

const MonthSelect = styled(SelectBase)`
  width: 4.375rem;
`;

const ExportButton = styled.button`
  width: 80%;
  max-width: 11.25rem;
  padding: 0.75rem 1.25rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  margin-top: 1.875rem;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
