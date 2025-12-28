import styled from '@emotion/styled';
import { useState } from 'react';

interface SelectButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const SelectButton = ({ label, isSelected, onClick }: SelectButtonProps) => {
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

interface ButtonProps {
  selected: boolean;
}

const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 13.75rem;
  height: 5rem;
  border-radius: 1rem;
  border: 0.125rem solid ${({ selected }) => (selected ? '#0F50A0' : '#3B3B3B')};
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #0f50a0;
  }
`;

const RadioOuter = styled.div<ButtonProps>`
  width: 1.75rem;
  height: 1.75rem;
  border: 0.1875rem solid
    ${({ selected }) => (selected ? '#0F50A0' : '#3B3B3B')};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RadioInner = styled.div`
  width: 0.875rem;
  height: 0.875rem;
  background-color: #0f50a0;
  border-radius: 50%;
`;

const LabelText = styled.span<ButtonProps>`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${({ selected }) => (selected ? '#0F50A0' : '#3B3B3B')};
`;
