import styled from '@emotion/styled';
import { PiExportBold } from 'react-icons/pi';
import React from 'react';

interface ExcelButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const ExcelButton = ({ onClick, disabled }: ExcelButtonProps) => {
  return (
    <ButtonContainer onClick={onClick} disabled={disabled}>
      <PiExportBold size="1.25rem" style={{ flexShrink: 0 }} />
      <ButtonText>엑셀 파일로 내보내기</ButtonText>
    </ButtonContainer>
  );
};

export default ExcelButton;

const ButtonContainer = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  background-color: #ffffff;
  border-radius: 3.125rem;
  border: 0.125rem solid #0f50a0;
  box-shadow: 0 0.25rem 0.625rem rgba(0, 0, 0, 0.1);
  color: #333333;
  font-size: 1.1rem;
  font-weight: 600;
  transition: background-color 0.2s, box-shadow 0.2s;
  position: relative;
  top: 0.5rem;
  white-space: normal;
  text-align: center;
  min-width: 120px;

  &:hover {
    background-color: #f0f0f0;
    box-shadow: 0 0.25rem 0.9375rem rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    background-color: #f8f8f8;
    border-color: #a0a0a0;
  }
`;

const ButtonText = styled.span``;
