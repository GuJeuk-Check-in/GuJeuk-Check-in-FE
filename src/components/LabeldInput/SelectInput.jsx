import React, { useState } from 'react';
import styled from '@emotion/styled';
import VisitFormInput from '../LabeldInput/VisitFormInput';
import SelectOptionCard from '../LabeldInput/SelectOptionCard';

const SelectInput = ({
  label,
  placeholder,
  icon,
  value,
  onChange,
  options,
  cols = 4,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder;

  const handleSelect = (optionValue) => {
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

const OptionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ cols }) => cols}, 1fr);
  gap: 15px;
  margin-top: 10px;
  padding: 10px 0;
`;
