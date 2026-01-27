import { useState } from 'react';
import styled from '@emotion/styled';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import React from 'react';

interface ToggleSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (option: string) => void;
  icon: React.ReactNode;
  placeholder?: string;
  disable?: boolean;
}

const ToggleSelect = ({
  label,
  options,
  value,
  onChange,
  icon,
  placeholder,
  disable,
}: ToggleSelectProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (option: any) => {
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
        <ArrowIcon>{open ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}</ArrowIcon>
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

export default ToggleSelect;

interface OptionProps {
  selected: boolean;
}

interface BoxProps {
  isDisable?: boolean;
}

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
  font-size: 1.25rem;
  color: #2e2e32;
  font-weight: 500;
`;

const Box = styled.div<BoxProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 0.0625rem solid #2e2e32;
  color: #6a6a6a;
  border-radius: 0.5rem;
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
  font-size: 1.25rem;
  color: #2e2e32;
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
  background-color: #ffffff;
  margin: 0;
  padding: 0;
`;

const Option = styled.div<OptionProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 0.0625rem solid #2e2e32;
  border-radius: 0.5rem;
  padding: 0.625rem 0.9375rem;
  height: 2.5rem;
  cursor: pointer;
  transition: 0.2s;
  background-color: ${({ selected }) => (selected ? '#E9F0FF' : 'white')};

  &:hover {
    background-color: #f4f8ff;
  }
`;

const Circle = styled.div<OptionProps>`
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  border: 0.125rem solid #0f50a0;
  background-color: ${({ selected }) => (selected ? '#0f50a0' : 'transparent')};
  transition: 0.2s;
  box-shadow: ${({ selected }) =>
    selected ? 'inset 0 0 0 0.1875rem #FFFFFF' : 'none'};
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
  color: #2e2e2e;
  font-size: 1.5rem;
`;

const ArrowIcon = styled.div`
  display: flex;
  align-items: center;
`;
