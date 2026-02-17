import styled from '@emotion/styled';
import { MdAdd, MdClose, MdCheck } from 'react-icons/md';
import { useState } from 'react';
import React from 'react';

interface AddInputProps {
  placeholder?: string;
  isDisabled?: boolean;
  onConfirm: (value: string) => void;
}

export const AddInput = ({
  placeholder = '입력하세요',
  isDisabled = false,
  onConfirm,
}: AddInputProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [value, setValue] = useState('');

  const handleConfirm = () => {
    onConfirm(value);
  };

  const handleCancel = () => {
    setValue('');
    setIsAdding(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleConfirm();
    }
  };

  if (!isAdding) {
    return (
      <Container
        $isAddButton
        onClick={() => setIsAdding(true)}
        $isDisabled={isDisabled}
      >
        <MdAdd size={48} color={isDisabled ? '#ccc' : '#007bff'} />
      </Container>
    );
  }

  return (
    <Container $isDisabled={isDisabled}>
      <AddInputBox
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isDisabled}
        autoFocus
        placeholder={placeholder}
      />
      <IconSection>
        <MdCheck
          size={26}
          color={isDisabled ? '#ccc' : '#007bff'}
          style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
          onClick={handleConfirm}
        />
        <MdClose
          size={26}
          color={isDisabled ? '#ccc' : '#dc3545'}
          style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
          onClick={handleCancel}
        />
      </IconSection>
    </Container>
  );
};

interface ContainerProps {
  $isAddButton?: boolean;
  $isDisabled?: boolean;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: 20.625rem;
  height: 9.375rem;
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: ${({ $isAddButton }) =>
    $isAddButton ? 'center' : 'space-between'};
  padding: ${({ $isAddButton }) => ($isAddButton ? '0' : '0 1rem')};
  background-color: #ffffff;
  border: ${({ $isAddButton }) =>
    $isAddButton ? '0.125rem dashed #6f95c4' : '0.0625rem solid #6f95c4'};
  box-sizing: border-box;
  margin: 0 auto 0.9375rem auto;
  transition: 0.2s ease;
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.6 : 1)};
  cursor: ${({ $isDisabled, $isAddButton }) =>
    $isDisabled ? 'not-allowed' : $isAddButton ? 'pointer' : 'default'};
  pointer-events: ${({ $isDisabled, $isAddButton }) =>
    $isDisabled && !$isAddButton ? 'none' : 'auto'};

  &:hover {
    background-color: ${({ $isAddButton, $isDisabled }) =>
      $isAddButton && !$isDisabled ? '#f9fbff' : '#ffffff'};
  }
`;

const AddInputBox = styled.input`
  font-size: 1.375rem;
  border: none;
  border-bottom: 0.125rem solid #007bff;
  outline: none;
  padding: 0.25rem 0;
  width: 70%;
  color: #2e2e32;
  font-weight: 500;

  &:disabled {
    cursor: progress;
    background-color: #f0f0f0;
  }
`;

const IconSection = styled.div`
  display: flex;
  gap: 0.9375rem;
`;
