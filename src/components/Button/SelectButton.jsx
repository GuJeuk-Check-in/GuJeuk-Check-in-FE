import styled from '@emotion/styled';
import { useState } from 'react';

const SelectButton = ({ label, isSelected, onClick }) => {
  return (
    <Button selected={isSelected} onClick={onClick}>
      <RadioOuter selected={isSelected}>
        {isSelected && <RadioInner />}
      </RadioOuter>
      <LabelText selected={isSelected}>{label}</LabelText>
    </Button>
  );
};

export default SelectButton;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  width: 220px;
  height: 80px;

  border-radius: 16px;
  border: 2px solid ${({ selected }) => (selected ? '#0F50A0' : '#3B3B3B')};
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #0f50a0;
  }
`;

const RadioOuter = styled.div`
  width: 28px;
  height: 28px;
  border: 3px solid ${({ selected }) => (selected ? '#0F50A0' : '#3B3B3B')};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RadioInner = styled.div`
  width: 14px;
  height: 14px;
  background-color: #0f50a0;
  border-radius: 50%;
`;

const LabelText = styled.span`
  font-size: 24px;
  font-weight: 500;
  color: ${({ selected }) => (selected ? '#0F50A0' : '#3B3B3B')};
`;
