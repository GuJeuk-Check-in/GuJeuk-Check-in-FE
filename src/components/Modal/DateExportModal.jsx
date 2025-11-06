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
  width: 420px;
  max-width: 90%;
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: bold;
  color: #404040;
  margin-bottom: 30px;
  text-align: center;
`;

const DateSelectorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Label = styled.span`
  margin: 0 5px 0 20px;
  font-size: 1rem;
  font-weight: 500;
  color: #404040;
`;

const SelectBase = styled.select`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  color: #404040;
  background-color: white;
  appearance: none;
  cursor: pointer;
  transition: border-color 0.2s;
  text-align-last: center;
  background-repeat: no-repeat;
  background-position: right 8px top 50%;
  background-size: 16px;
`;

const YearSelect = styled(SelectBase)`
  width: 90px;
`;

const MonthSelect = styled(SelectBase)`
  width: 70px;
`;

const ExportButton = styled.button`
  width: 80%;
  max-width: 180px;
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  margin-top: 30px;

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
