import styled from '@emotion/styled';
import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { keyframes } from '@emotion/react';

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

interface SimpleDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  width?: string;
  hasOther?: boolean;
  disabled?: boolean;
}

export const SimpleDropdown = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  width = '100%',
  hasOther = false,
  disabled = false,
}: SimpleDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [otherValue, setOtherValue] = useState('');

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: string) => {
    if (option === '기타 지역') return;
    onChange(option);
    setIsOpen(false);
  };

  const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setOtherValue(val);
    onChange(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsOpen(false);
    }
  };

  const isOtherSelected = value && !options.includes(value);
  const displayValue = value;

  return (
    <Container style={{ width }}>
      {label && <Label>{label}</Label>}
      <DropdownWrapper>
        <DropdownHeader onClick={handleToggle} disabled={disabled}>
          <DropdownValue>
            {displayValue || placeholder || `${label} 선택`}
          </DropdownValue>
          <ArrowIcon>
            {isOpen ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
          </ArrowIcon>
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
            {hasOther && (
              <DropdownItem
                isSelected={!!isOtherSelected}
                onClick={(e) => e.stopPropagation()}
              >
                <OtherWrapper>
                  <span>기타 지역:</span>
                  <OtherInput
                    type="text"
                    value={isOtherSelected ? value : otherValue}
                    onChange={handleOtherChange}
                    onKeyDown={handleKeyDown}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="직접 입력"
                  />
                </OtherWrapper>
              </DropdownItem>
            )}
          </DropdownList>
        )}
      </DropdownWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
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

const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownHeader = styled.div<{ disabled?: boolean }>`
  width: 100%;
  height: 3.5rem;
  border: 0.0625rem solid #404040;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  font-size: 1.25rem;
  color: ${({ disabled }) => (disabled ? '#a0a0a0' : '#2e2e32')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background-color: ${({ disabled }) => (disabled ? '#f5f5f5' : '#fff')};
  box-sizing: border-box;
`;

const DropdownValue = styled.span`
  text-align: left;
`;

const ArrowIcon = styled.div`
  display: flex;
  align-items: center;
  color: #2e2e32;
`;

const DropdownList = styled.div`
  position: absolute;
  top: 4rem;
  left: 0;
  width: 100%;
  max-height: 15rem;
  overflow-y: auto;
  background-color: #ffffff;
  border: 0.0625rem solid #404040;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
  z-index: 100;
  animation: ${slideDown} 0.2s ease-out;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 0.375rem;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #dcdcdc;
    border-radius: 0.1875rem;
  }
`;

const DropdownItem = styled.div<{ isSelected: boolean }>`
  padding: 0.75rem 1rem;
  font-size: 1.125rem;
  color: ${({ isSelected }) => (isSelected ? '#ffffff' : '#2e2e32')};
  background-color: ${({ isSelected }) => (isSelected ? '#2e2e32' : '#ffffff')};
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ isSelected }) =>
      isSelected ? '#2e2e32' : '#f5f5f5'};
  }
`;

const OtherWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`;

const OtherInput = styled.input`
  flex: 1;
  border: none;
  border-bottom: 0.0625rem solid #2e2e32;
  background: transparent;
  font-size: 1.125rem;
  color: inherit;
  outline: none;
  padding: 0.125rem 0;

  &::placeholder {
    color: #a0a0a0;
  }
`;
