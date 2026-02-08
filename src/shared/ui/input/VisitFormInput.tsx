import styled from '@emotion/styled';
import { IoMdPerson } from 'react-icons/io';
import React from 'react';

interface VisitFormInputProps {
  label: string;
  placeholder?: string;
  icon?: React.ReactNode;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  isSelectable?: boolean;
  isOpen?: boolean;
  onClick?: () => void;
  readOnly?: boolean;
}

const VisitFormInput = ({
  label,
  placeholder,
  icon = <IoMdPerson size="1.5rem" />,
  value,
  onChange,
  width = '100%',
  onClick,
  readOnly = false,
}: VisitFormInputProps) => {
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

export default VisitFormInput;

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
  font-size: 1.25rem;
  color: #2e2e32;
  font-weight: 500;
`;

const InputContainer = styled.div`
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
`;

const Input = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;
  font-size: 1.25rem;
  color: #2e2e32;
  padding: 0;
`;
