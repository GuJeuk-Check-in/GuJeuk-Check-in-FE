import styled from '@emotion/styled';
import { MdEdit } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { useState } from 'react';
import { useUpdatePurpose } from '../../hooks/updatePurpose';

const PurposeBox = ({ purpose, onDelete, isDeleting }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newLabel, setNewLabel] = useState(purpose.purpose);
  const [isEnterHandled, setIsEnterHandled] = useState(false);

  const { mutate: updateMutate, isLoading: isUpdating } = useUpdatePurpose();

  const handleUpdate = () => {
    const trimmedLabel = newLabel.trim();

    if (!trimmedLabel) {
      handleCancel();
      return;
    }
    if (trimmedLabel === purpose.purpose) {
      setIsEditing(false);
      return;
    }
    updateMutate({ id: purpose.id, newPurpose: trimmedLabel });
    setIsEditing(false);
  };

  const handleBlur = () => {
    if (isEnterHandled) {
      setTimeout(() => setIsEnterHandled(false), 0);
      return;
    }
    handleUpdate();
  };

  const handleDelete = () => {
    onDelete(purpose.id);
  };

  const handleCancel = () => {
    setNewLabel(purpose.purpose);
    setIsEditing(false);
  };

  const isDisabled = isDeleting || isUpdating;

  return (
    <Container $isDisabled={isDisabled}>
      <DeleteIcon
        onClick={isDisabled ? null : handleDelete}
        $isDeleting={isDisabled}
      >
        {isDisabled ? '...' : <IoClose size={20} />}
      </DeleteIcon>

      {isEditing ? (
        <EditInput
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (isUpdating) return;
            if (e.key === 'Enter') {
              e.preventDefault();
              setIsEnterHandled(true);
              handleUpdate();
            }
            if (e.key === 'Escape') handleCancel();
          }}
          autoFocus
          disabled={isUpdating}
        />
      ) : (
        <Label>
          {purpose.purpose}{' '}
          <MdEdit
            size={18}
            onClick={() => {
              if (!isDisabled) {
                setIsEditing(true);
              }
            }}
            $isDisabled={isDisabled}
          />
        </Label>
      )}
    </Container>
  );
};

export default PurposeBox;
const Container = styled.div`
  width: 100%;
  max-width: 330px;
  height: 150px;
  background-color: #ffffff;
  border-radius: 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 500;
  color: #3a3a3a;
  opacity: ${(props) => (props.$isDisabled ? 0.7 : 1)};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
`;

const DeleteIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 12px;
  color: ${(props) => (props.$isDeleting ? '#aaaaaa' : '#dc7676')};
  cursor: ${(props) => (props.$isDeleting ? 'not-allowed' : 'pointer')};
  transition: 0.2s ease;
  &:hover {
    transform: ${(props) => (props.$isDeleting ? 'none' : 'scale(1.1)')};
  }
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  font-size: 24px;
  gap: 6px;
  svg {
    cursor: pointer;
    color: #5a5a5a;
    transition: 0.2s ease;
    &:hover {
      color: #1e3a8a;
    }
  }
`;

const EditInput = styled.input`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  border: none;
  border-bottom: 2px solid #1e3a8a;
  outline: none;
  width: 80%;
  color: #2e2e32;
  padding: 0;
`;
