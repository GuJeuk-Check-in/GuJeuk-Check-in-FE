import React, { useState } from 'react';
import styled from '@emotion/styled';
import VisitFormInput from './VisitFormInput';
import SelectOptionCard from './SelectOptionCard';

interface SelectInputProps {
  label: string;
  placeholder?: string;
  icon: React.ReactNode;
  value: string;
  onChange: (e: { target: { value: string } }) => void;
  options: { label: string; value: string }[];
  cols?: number;
}

const SelectInput = ({
  label,
  placeholder,
  icon,
  value,
  onChange,
  options,
  cols = 4,
}: SelectInputProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder || '';

  const handleSelect = (optionValue: string) => {
    onChange({ target: { value: optionValue } });
    setIsOpen(false);
  };

  return (
    <Wrapper>
      <VisitFormInput
        label={label}
        placeholder={placeholder}
        icon={icon}
        value={selectedLabel}
        isSelectable={true}
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <OptionContainer cols={cols}>
          {options.map((option) => (
            <SelectOptionCard
              key={option.value}
              label={option.label}
              isSelected={option.value === value}
              onClick={() => handleSelect(option.value)}
            />
          ))}
        </OptionContainer>
      )}
    </Wrapper>
  );
};

export default SelectInput;

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const OptionContainer = styled.div<{ cols: number }>`
  display: grid;
  grid-template-columns: repeat(${({ cols }) => cols}, 1fr);
  gap: 0.9375rem;
  margin-top: 0.625rem;
  padding: 0.625rem 0;
`;
