import { adminTokens } from '@center/tokens';
import { useState } from 'react';
import styled from '@emotion/styled';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { keyframes } from '@emotion/react';
import React from 'react';

interface ToggleSelectProps {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (option: string) => void;
  icon?: React.ReactNode;
  placeholder?: string;
  disable?: boolean;
}

export const ToggleSelect = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  disable,
}: ToggleSelectProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setOpen(false);
  };

  const handleToggle = () => {
    if (!disable) {
      setOpen((prev) => !prev);
    }
  };

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <Box onClick={handleToggle} isDisable={disable}>
        <SelectedValue>{value || placeholder || `${label} 선택`}</SelectedValue>
        <ArrowIcon>
          {open ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
        </ArrowIcon>
      </Box>

      {open && !disable && (
        <OptionContainer>
          {options.map((option) => (
            <Option
              key={option}
              onClick={() => handleSelect(option)}
              selected={value === option}
            >
              <Circle selected={value === option} />
              <span>{option}</span>
            </Option>
          ))}
        </OptionContainer>
      )}
    </Container>
  );
};

interface OptionProps {
  selected: boolean;
}

interface BoxProps {
  isDisable?: boolean;
}

const slideDown = keyframes`
from {
  opacity: 0;
  transform: translateY(-10px);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  box-sizing: border-box;
`;

const Label = styled.label`
  font-size: ${({ theme }) => adminTokens(theme).typography.input};
  color: ${({ theme }) => adminTokens(theme).colors.text};
  font-weight: 500;
`;

const Box = styled.div<BoxProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 0.0625rem solid ${({ theme }) => adminTokens(theme).colors.text};
  color: #6a6a6a;
  border-radius: ${({ theme }) => adminTokens(theme).components.fieldRadius};
  padding: 0.5rem 0.9375rem;
  width: calc(100% - 2rem);
  height: 2.5rem;

  cursor: ${({ isDisable }) => (isDisable ? 'not-allowed' : 'pointer')};
  background-color: ${({ isDisable }) => (isDisable ? '#f5f5f5' : 'white')};
  opacity: ${({ isDisable }) => (isDisable ? 0.6 : 1)};
  pointer-events: ${({ isDisable }) => (isDisable ? 'none' : 'auto')};

  & > svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const SelectedValue = styled.span`
  font-size: ${({ theme }) => adminTokens(theme).typography.input};
  color: ${({ theme }) => adminTokens(theme).colors.text};
`;

const OptionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  top: calc(3.5rem + 2.5rem);
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  z-index: 10;
  padding-top: 1.875rem;
  background-color: ${({ theme }) => adminTokens(theme).colors.white};
  margin: 0;
  padding: 0;
  animation: ${slideDown} 0.2s ease-out;
`;

const Option = styled.div<OptionProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 0.0625rem solid ${({ theme }) => adminTokens(theme).colors.text};
  border-radius: ${({ theme }) => adminTokens(theme).components.fieldRadius};
  padding: 0.625rem 0.9375rem;
  height: 2.5rem;
  cursor: pointer;
  transition: 0.2s;
  background-color: ${({ selected, theme }) => (selected ? adminTokens(theme).colors.selected : adminTokens(theme).colors.white)};

  &:hover {
    background-color: ${({ theme }) => adminTokens(theme).colors.selectedHover};
  }
`;

const Circle = styled.div<OptionProps>`
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  border: 0.125rem solid ${({ theme }) => adminTokens(theme).colors.primary};
  background-color: ${({ selected, theme }) => (selected ? adminTokens(theme).colors.primary : 'transparent')};
  transition: 0.2s;
  box-shadow: ${({ selected, theme }) =>
    selected ? `inset 0 0 0 0.1875rem ${adminTokens(theme).colors.white}` : 'none'};
`;

const ArrowIcon = styled.div`
  display: flex;
  align-items: center;
`;
