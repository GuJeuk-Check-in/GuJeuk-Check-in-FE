import styled from '@emotion/styled';
import { MdAdd, MdClose, MdCheck } from 'react-icons/md';
import { useState } from 'react';
import { useCreatePurpose } from '../../hooks/createPurpose';
import React from 'react';

const PurposeAddBox = () => {
  const { mutate: createMutate, isLoading: isCreating } =
    useCreatePurpose() as any;

  const [isAdding, setIsAdding] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isDisabled = isCreating;

  const handleAdd = () => {
    const trimmedLabel = newLabel.trim();
    if (!trimmedLabel) {
      alert('목적을 입력해주세요.');
      return;
    }
    if (isSubmitting) return;
    setIsSubmitting(true);

    createMutate(trimmedLabel, {
      onSuccess: () => {
        setNewLabel('');
        setIsAdding(false);
        setIsSubmitting(false);
      },
      onError: () => setIsSubmitting(false),
    });
  };

  const handleCancel = () => {
    if (isDisabled) return;
    setNewLabel('');
    setIsAdding(false);
  };

  const handlekeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLabel(e.target.value);
  };

  if (!isAdding) {
    return (
      <Container
        $isAddButton={true}
        onClick={isDisabled ? undefined : () => setIsAdding(true)}
        $isDisabled={isDisabled}
      >
        <MdAdd size={48} color={isDisabled ? '#ccc' : '#007bff'} />
      </Container>
    );
  }

  return (
    <Container $isDisabled={isDisabled}>
      <AddInput
        type="text"
        value={newLabel}
        onChange={(e) => setNewLabel(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleAdd();
          }
        }}
      />
      <IconSection>
        <MdCheck
          size={26}
          color={isDisabled ? '#ccc' : '#007bff'}
          style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
          onClick={handleAdd}
        />
        <MdClose
          size={26}
          color={isDisabled ? '#ccc' : '#dc3545'}
          style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
          onClick={isDisabled ? undefined : handleCancel}
        />
      </IconSection>
    </Container>
  );
};

export default PurposeAddBox;

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
  opacity: ${(props) => (props.$isDisabled ? 0.6 : 1)};
  cursor: ${(props) =>
    props.$isDisabled
      ? 'not-allowed'
      : props.$isAddButton
      ? 'pointer'
      : 'default'};
  pointer-events: ${(props) =>
    props.$isDisabled && !props.$isAddButton && 'none'};

  &:hover {
    background-color: ${({ $isAddButton, $isDisabled }) =>
      $isAddButton && !$isDisabled ? '#f9fbff' : '#ffffff'};
  }
`;

const AddInput = styled.input`
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
