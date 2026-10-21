import { adminTokens } from '@center/tokens';
import styled from '@emotion/styled';
import { IoMdPerson } from 'react-icons/io';
import React from 'react';

interface FormInputProps {
  label: string;
  placeholder?: string;
  icon?: React.ReactNode;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  isSelectable?: boolean;
  isOpen?: boolean;
  onClick?: () => void;
}

export const FormInput = ({
  label,
  placeholder,
  icon = <IoMdPerson size="1.5rem" />,
  value,
  onChange,
  width = '100%',
  onClick,
}: FormInputProps) => {
  return (
    <Container width={width} onClick={onClick}>
      <Label>{label}</Label>{' '}
      <InputContainer>
        {icon}
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{ cursor: onClick ? 'pointer' : 'text' }}
        />
      </InputContainer>
    </Container>
  );
};

interface ContainerProps {
  width: string;
}

const Container = styled.div<ContainerProps>`
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

const InputContainer = styled.div`
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
`;

const Input = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;
  font-size: ${({ theme }) => adminTokens(theme).typography.input};
  color: ${({ theme }) => adminTokens(theme).colors.text};
  padding: 0;
`;
