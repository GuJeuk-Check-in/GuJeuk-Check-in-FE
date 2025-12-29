import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useState, useCallback, ChangeEvent } from 'react';
import React from 'react';

interface DateExportModalProps {
  isVisible: boolean;
  onClose: () => void;
  onExport: (year: number, month: number) => void;
}

const DateExportModal = ({
  isVisible,
  onClose,
  onExport,
}: DateExportModalProps) => {
  if (!isVisible) {
    return null;
  }

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  const years = [2024, 2025, 2026];
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const defaultYear = years.includes(currentYear) ? currentYear : years[0];

  const [selectedYear, setSelectedYear] = useState<number>(defaultYear);
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);

  const handleExport = useCallback(() => {
    onExport(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth, onExport]);

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(e.target.value, 10));
  };

  const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(e.target.value, 10));
  };

  return (
    <ModalOverlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Title>추출할 기간 선택</Title>
        <DateSelectorWrapper>
          <StyledSelectWrapper>
            <StyledSelect value={selectedYear} onChange={handleYearChange}>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </StyledSelect>
          </StyledSelectWrapper>
          <Label>년</Label>
          <StyledSelectWrapper>
            <StyledSelect value={selectedMonth} onChange={handleMonthChange}>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </StyledSelect>
          </StyledSelectWrapper>
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

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Container = styled.div`
  width: 28rem;
  max-width: 90%;
  background-color: #ffffff;
  padding: 2.5rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  animation: ${fadeInUp} 0.3s ease-out;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #333333;
  margin: 0 0 2rem 0;
  text-align: center;
  letter-spacing: -0.5px;
`;

const DateSelectorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;

const Label = styled.span`
  margin: 0 0.5rem 0 1rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #555555;
`;

const StyledSelectWrapper = styled.div`
  position: relative;
  display: flex;
`;

const StyledSelect = styled.select`
  width: auto;
  min-width: 6rem;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1.125rem;
  color: #333333;
  background-color: white;
  appearance: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;

  &:focus {
    outline: none;
    border-color: #0f50a0;
    box-shadow: 0 0 0 3px rgba(15, 80, 160, 0.1);
  }

  &:hover {
    border-color: #cbd5e1;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ExportButton = styled.button`
  width: 80%;
  padding: 1rem;
  background-color: #0f50a0;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 6px rgba(15, 80, 160, 0.2);

  &:hover {
    background-color: #0a4085;
    box-shadow: 0 6px 8px rgba(15, 80, 160, 0.3);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: none;
  }
`;
