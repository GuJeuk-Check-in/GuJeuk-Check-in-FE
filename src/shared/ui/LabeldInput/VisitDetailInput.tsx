import styled from '@emotion/styled';
import React from 'react';

interface VisitDetailInputOption {
  value: string;
  label: string;
}

interface VisitDetailInputProps {
  label: string;
  value: any;
  width?: string;
  isEditable?: boolean;
  name?: string;
  onChange?:
    | ((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void)
    | null;
  type?: string;
  options?: VisitDetailInputOption[];
  placeholder?: string;
}

const VisitDetailInput: React.FC<VisitDetailInputProps> = ({
  label,
  value,
  width = '100%',
  isEditable = false,
  name,
  onChange,
  type = 'text',
  options = [],
  placeholder = '',
}) => {
  const renderInput = () => {
    if (!isEditable) {
      if (type === 'checkbox') {
        const displayValue = value ? '동의 (O)' : '미동의 (X)';
        return (
          <InputContainer isEditable={false}>
            <ReadOnlyText>{displayValue}</ReadOnlyText>
          </InputContainer>
        );
      }
      return (
        <InputContainer isEditable={false}>
          <ReadOnlyText>{value}</ReadOnlyText>
        </InputContainer>
      );
    }
    if (type === 'select') {
      return (
        <StyledSelect name={name} value={value} onChange={(e) => onChange?.(e)}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
      );
    }
    if (type === 'checkbox') {
      return (
        <EditableCheckboxWrapper isEditable={true}>
          <EditableCheckbox
            type="checkbox"
            name={name}
            checked={!!value}
            onChange={(e) => onChange?.(e)}
            id={`${name}-${label}`}
          />
        </EditableCheckboxWrapper>
      );
    }
    return (
      <InputContainer isEditable={true}>
        <Input
          type={type}
          name={name}
          value={value}
          onChange={(e) => onChange?.(e)}
          readOnly={false}
          placeholder={placeholder}
          min={type === 'number' ? 0 : undefined}
        />
      </InputContainer>
    );
  };

  return (
    <Container width={width}>
      <Label>{label}</Label>
      {renderInput()}
    </Container>
  );
};

export default VisitDetailInput;

const Container = styled.div<{ width: string }>`
  width: ${({ width }) => width};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-sizing: border-box;
`;

const Label = styled.label`
  display: block;
  font-size: 1.25rem;
  color: #2e2e32;
  font-weight: 500;
`;

const InputContainer = styled.div<{ isEditable: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1rem;
  height: 3.5rem;
  border: 0.0625rem solid #404040;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  color: #2e2e32;
  background-color: #ffffff;
  box-shadow: none;
`;

const Input = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;
  font-size: 1.25rem;
  color: #2e2e32;
  padding: 0;
  background-color: transparent;
  color: #000000;

  &[type='date'],
  &[type='number'] {
    cursor: pointer;
  }
`;

const ReadOnlyText = styled.p`
  margin: 0;
  font-size: 1.25rem;
  color: #2e2e32;
  width: 100%;
`;

const StyledSelect = styled.select`
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 3.5rem;
  padding: 0 1rem;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  color: #2e2e32;
  background-color: #ffffff;
  background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd" /></svg>');
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.2rem;
  cursor: pointer;
  outline: none;
`;

const EditableCheckboxWrapper = styled(InputContainer)`
  justify-content: flex-start;
  padding: 0 1rem;
  background-color: #ffffff;
`;

const EditableCheckbox = styled.input`
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
  margin: 0;
`;
