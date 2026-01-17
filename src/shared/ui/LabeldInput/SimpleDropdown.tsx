import styled from '@emotion/styled';
import { useState } from 'react';
import React from 'react';

interface SimpleDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SimpleDropdown = ({
  label,
  options,
  value,
  onChange,
  placeholder,
}: SimpleDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <DropdownWrapper>
        <DropdownHeader onClick={handleToggle}>
          <DropdownValue>
            {value || placeholder || `${label} 선택`}
          </DropdownValue>
          <DropdownIcon isOpen={isOpen} />
        </DropdownHeader>

        {isOpen && (
          <DropdownList>
            {options.map((option) => (
              <DropdownItem
                key={option}
                onClick={() => handleSelect(option)}
                isSelected={option === value}
              >
                {option}
              </DropdownItem>
            ))}
          </DropdownList>
        )}
      </DropdownWrapper>
    </Container>
  );
};

export default SimpleDropdown;

interface DropdownIconProps {
  isOpen: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 96.5%;
  position: relative;
`;

const Label = styled.label`
  font-size: 1.25rem;
  color: #2e2e32;
  font-weight: 500;
`;

const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownHeader = styled.div`
  width: 100%;
  height: 3.5rem;
  border: 0.0625rem solid #404040;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  font-size: 1.125rem;
  color: #2e2e32;
  cursor: pointer;
  background-color: #fff;
`;

const DropdownValue = styled.span`
  text-align: left;
`;

const DropdownIcon = styled.div<DropdownIconProps>`
  width: 0;
  height: 0;
  border-left: 0.375rem solid transparent;
  border-right: 0.375rem solid transparent;
  border-top: ${({ isOpen }) => (isOpen ? 'none' : '0.375rem solid #2e2e32')};
  border-bottom: ${({ isOpen }) =>
    isOpen ? '0.375rem solid #2e2e32' : 'none'};
`;

const DropdownList = styled.div`
  position: absolute;
  top: 3.75rem;
  width: 100%;
  max-height: 13.75rem;
  overflow-y: auto;
  background-color: #ffffff;
  border: 0.0625rem solid #404040;
  border-radius: 0.5rem;
  box-shadow: 0 0.375rem 0.625rem rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

const DropdownItem = styled.div<{ isSelected: boolean }>`
  padding: 12px 16px;
  font-size: 1rem;
  color: ${({ isSelected }) => (isSelected ? '#ffffff' : '#2e2e32')};
  background-color: ${({ isSelected }) => (isSelected ? '#2e2e32' : '#ffffff')};
  cursor: pointer;
  text-align: left;

  &:hover {
    background-color: ${({ isSelected }) =>
      isSelected ? '#2e2e32' : '#f5f5f5'};
  }
`;
