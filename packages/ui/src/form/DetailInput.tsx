import { adminTokens } from '@center/tokens';
import styled from '@emotion/styled';
import React from 'react';

interface DetailInputOption {
  value: string;
  label: string;
}

export interface DetailInputProps {
  label: string;
  value: string | number | readonly string[];
  width?: string;
  isEditable?: boolean;
  name?: string;
  onChange?:
    | ((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void)
    | null;
  type?: string;
  options?: DetailInputOption[];
  placeholder?: string;
  checkboxLabels?: { checked: string; unchecked: string };
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  multiple?: boolean;
  hideNumberSpinner?: boolean;
}

export const DetailInput: React.FC<DetailInputProps> = ({
  label,
  value,
  width = '100%',
  isEditable = false,
  name,
  onChange,
  type = 'text',
  options = [],
  placeholder = '',
  checkboxLabels = { checked: '선택됨', unchecked: '선택 안 됨' },
  icon,
  trailingIcon,
  multiple = false,
  hideNumberSpinner = false,
}) => {
  const inputId = React.useId();
  const labelId = `${inputId}-label`;

  const renderInput = () => {
    if (!isEditable) {
      const displayValue = type === 'checkbox'
        ? (value ? checkboxLabels.checked : checkboxLabels.unchecked)
        : value;
      return (
        <InputContainer
          isEditable={false}
          $hasIcon={!!icon}
          role="group"
          aria-labelledby={labelId}
        >
          {icon && <FieldIcon aria-hidden="true">{icon}</FieldIcon>}
          <ReadOnlyText>{displayValue}</ReadOnlyText>
          {trailingIcon && <FieldIcon aria-hidden="true">{trailingIcon}</FieldIcon>}
        </InputContainer>
      );
    }
    if (type === 'select') {
      return (
        <StyledSelect id={inputId} name={name} value={value} multiple={multiple} onChange={(e) => onChange?.(e)}>
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
            id={inputId}
          />
        </EditableCheckboxWrapper>
      );
    }
    return (
      <InputContainer isEditable={true} $hasIcon={!!icon}>
        {icon && <FieldIcon aria-hidden="true">{icon}</FieldIcon>}
        <Input
          id={inputId}
          type={type}
          name={name}
          value={value}
          onChange={(e) => onChange?.(e)}
          readOnly={false}
          placeholder={placeholder}
          min={type === 'number' ? 0 : undefined}
          $hideNumberSpinner={hideNumberSpinner}
        />
      </InputContainer>
    );
  };

  return (
    <Container width={width}>
      <Label id={labelId} htmlFor={isEditable ? inputId : undefined}>{label}</Label>
      {renderInput()}
    </Container>
  );
};

const Container = styled.div<{ width: string }>`
  width: ${({ width }) => width};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-sizing: border-box;
`;

const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => adminTokens(theme).typography.input};
  color: ${({ theme }) => adminTokens(theme).colors.text};
  font-weight: 500;
`;

const InputContainer = styled.div<{ isEditable: boolean; $hasIcon?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1rem;
  height: ${({ theme }) => adminTokens(theme).components.fieldHeight};
  border: 0.0625rem solid ${({ theme }) => adminTokens(theme).colors.fieldBorder};
  border-radius: ${({ theme }) => adminTokens(theme).components.fieldRadius};
  font-size: ${({ theme }) => adminTokens(theme).typography.input};
  color: ${({ theme }) => adminTokens(theme).colors.text};
  background-color: ${({ theme }) => adminTokens(theme).colors.white};
  box-shadow: none;

  ${({ $hasIcon, theme }) => $hasIcon && `
    box-sizing: border-box;
    min-height: calc(${adminTokens(theme).components.fieldHeight} + 0.125rem);
    height: auto;
    padding-block: 0.75rem;
    min-width: 0;
  `}
`;

const FieldIcon = styled.span`
  display: flex;
  flex-shrink: 0;
  font-size: 1.5rem;
`;

const Input = styled.input<{ $hideNumberSpinner: boolean }>`
  flex-grow: 1;
  min-width: 0;
  border: none;
  outline: none;
  font-size: ${({ theme }) => adminTokens(theme).typography.input};
  color: ${({ theme }) => adminTokens(theme).colors.text};
  padding: 0;
  background-color: transparent;
  color: ${({ theme }) => adminTokens(theme).colors.black};

  &[type='date'],
  &[type='number'] {
    cursor: pointer;
  }

  ${({ $hideNumberSpinner }) => $hideNumberSpinner && `
    &[type='number'] { appearance: textfield; -moz-appearance: textfield; cursor: text; }
    &::-webkit-inner-spin-button, &::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
  `}
`;

const ReadOnlyText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => adminTokens(theme).typography.input};
  color: ${({ theme }) => adminTokens(theme).colors.text};
  width: 100%;
  min-width: 0;
  overflow-wrap: anywhere;
`;

const StyledSelect = styled.select`
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: ${({ theme }) => adminTokens(theme).components.fieldHeight};
  padding: 0 1rem;
  border-radius: ${({ theme }) => adminTokens(theme).components.fieldRadius};
  font-size: ${({ theme }) => adminTokens(theme).typography.input};
  color: ${({ theme }) => adminTokens(theme).colors.text};
  background-color: ${({ theme }) => adminTokens(theme).colors.white};
  background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd" /></svg>');
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.2rem;
  cursor: pointer;
  outline: none;

  &[multiple] {
    height: auto;
    min-height: ${({ theme }) => adminTokens(theme).components.fieldHeight};
    padding-block: 0.5rem;
    background-image: none;
  }
`;

const EditableCheckboxWrapper = styled(InputContainer)`
  justify-content: flex-start;
  padding: 0 1rem;
  background-color: ${({ theme }) => adminTokens(theme).colors.white};
`;

const EditableCheckbox = styled.input`
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
  margin: 0;
`;
