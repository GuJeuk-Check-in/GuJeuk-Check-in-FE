import styled from '@emotion/styled';
import { MdAdd, MdClose, MdCheck } from 'react-icons/md';
import { useState } from 'react';
import usePurposeStore from '../../store/PurposeStore';
import { useCreatePurpose } from '../../hooks/createPurpose';

const PurposeAddBox = () => {
  const { mutate: createMutate, isLoading: isCreating } = useCreatePurpose();

  const [isAdding, setIsAdding] = useState(false);
  const [newLabel, setNewLabel] = useState('');

  const isDisabled = isCreating;

  const handleAdd = () => {
    const trimmedLabel = newLabel.trim();

    if (isDisabled) return;

    if (trimmedLabel) {
      createMutate(trimmedLabel, {
        onSuccess: () => {
          setNewLabel('');
          setIsAdding(false);
        },
      });
    } else {
      alert('목적을 입력해주세요.');
    }
  };

  const handleCancel = () => {
    if (isDisabled) return;
    setNewLabel('');
    setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <Container
        $isAddButton
        onClick={isDisabled ? null : () => setIsAdding(true)}
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
        placeholder={isDisabled ? '추가 중...' : '새 목적 입력'}
        value={newLabel}
        onChange={(e) => setNewLabel(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        autoFocus
        disabled={isDisabled}
      />
      <IconSection>
        <MdCheck
          size={26}
          color={isDisabled ? '#ccc' : '#007bff'}
          style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
          onClick={isDisabled ? null : handleAdd}
        />{' '}
        <MdClose
          size={26}
          color={isDisabled ? '#ccc' : '#dc3545'}
          style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
          onClick={isDisabled ? null : handleCancel}
        />
      </IconSection>
    </Container>
  );
};

export default PurposeAddBox;

const Container = styled.div`
  width: 100%;
  max-width: 330px;
  height: 150px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: ${({ $isAddButton }) =>
    $isAddButton ? 'center' : 'space-between'};
  padding: ${({ $isAddButton }) => ($isAddButton ? '0' : '0 16px')};
  background-color: #ffffff;
  border: ${({ $isAddButton }) =>
    $isAddButton ? '2px dashed #6f95c4' : '1px solid #6f95c4'};
  box-sizing: border-box;
  margin: 0 auto 15px auto;
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
  font-size: 22px;
  border: none;
  border-bottom: 2px solid #007bff;
  outline: none;
  padding: 4px 0;
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
  gap: 15px;
`;
