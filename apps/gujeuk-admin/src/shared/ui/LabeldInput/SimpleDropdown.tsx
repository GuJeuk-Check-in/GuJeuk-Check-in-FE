import {
  DropdownContainer as Container,
  DropdownLabel as Label,
  DropdownWrapper as DropdownWrapper,
  DropdownHeader as DropdownHeader,
  DropdownValue as DropdownValue,
  DropdownArrowIcon as ArrowIcon,
  DropdownList as DropdownList,
  DropdownItem as DropdownItem,
  DropdownOtherWrapper as OtherWrapper,
  DropdownOtherInput as OtherInput,
} from '@center/ui/form';
import { useState, useEffect } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

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

  useEffect(() => {
    if (disabled) {
      setIsOpen(false);
    }
  }, [disabled]);

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
