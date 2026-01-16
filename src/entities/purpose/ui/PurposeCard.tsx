import React, { useState } from 'react';
import styled from '@emotion/styled';
import { MdEdit } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';

interface Purpose {
  id: number;
  purpose: string;
}

interface PurposeProps {
  purpose: Purpose;
  onDelete: (id: number) => void;
  onUpdate: (params: { id: number; newPurpose: string }) => void;
  isDeleting: boolean;
}

const PurposeCard = ({
  purpose,
  onDelete,
  onUpdate,
  isDeleting,
}: PurposeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newLabel, setNewLabel] = useState(purpose.purpose);
  const [isEnterHandled, setIsEnterHandled] = useState(false);

  const preventDrag = (
    e: React.PointerEvent | React.MouseEvent | React.TouchEvent
  ) => {
    e.stopPropagation();
  };

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

    onUpdate({ id: purpose.id, newPurpose: trimmedLabel });
    setIsEditing(false);
  };

  const handleBlur = () => {
    if (isEnterHandled) {
      setTimeout(() => setIsEnterHandled(false), 0);
      return;
    }
    handleUpdate();
  };

  const handleCancel = () => {
    setNewLabel(purpose.purpose);
    setIsEditing(false);
  };

  return (
    <Container isDisabled={isDeleting}>
      <DeleteIcon
        type="button"
        onClick={() => onDelete(purpose.id)}
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        isDeleting={isDeleting}
        disabled={isDeleting}
      >
        {isDeleting ? (
          '...'
        ) : (
          <IoClose size="1.25rem" style={{ pointerEvents: 'none' }} />
        )}
      </DeleteIcon>

      {isEditing ? (
        <EditInput
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          onBlur={handleBlur}
          onPointerDown={preventDrag}
          onMouseDown={preventDrag}
          onKeyDown={(e) => {
            if (isDeleting) return;
            e.stopPropagation();

            if (e.key === 'Enter') {
              e.preventDefault();
              setIsEnterHandled(true);
              handleUpdate();
            }
            if (e.key === 'Escape') handleCancel();
          }}
          autoFocus
          disabled={isDeleting}
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <Label>
          {purpose.purpose}
          <StyledEditIcon
            size={18}
            onClick={() => {
              if (!isDeleting) {
                setIsEditing(true);
              }
            }}
            onPointerDown={preventDrag}
            onMouseDown={preventDrag}
            $isDisabled={isDeleting}
          />
        </Label>
      )}
    </Container>
  );
};

export default PurposeCard;

interface ContainerProps {
  isDisabled: boolean;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: 20.625rem;
  height: 9.375rem;
  background-color: #ffffff;
  border-radius: 1.25rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 500;
  color: #3a3a3a;
  opacity: ${(props) => (props.isDisabled ? 0.7 : 1)};
  box-shadow: 0 0.125rem 0.375rem rgba(0, 0, 0, 0.08);
`;

const DeleteIcon = styled.button<{ isDeleting: boolean }>`
  background: none;
  border: none;
  padding: 0;
  outline: none;
  position: absolute;
  top: 0.625rem;
  right: 0.75rem;
  color: ${(props) => (props.isDeleting ? '#aaaaaa' : '#dc7676')};
  cursor: ${(props) => (props.isDeleting ? 'not-allowed' : 'pointer')};
  transition: 0.2s ease;
  z-index: 10;

  &:hover {
    transform: ${(props) => (props.isDeleting ? 'none' : 'scale(1.1)')};
  }
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  gap: 0.375rem;
`;

const EditInput = styled.input`
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  border: none;
  border-bottom: 0.125rem solid #1e3a8a;
  outline: none;
  width: 80%;
  color: #2e2e32;
  padding: 0;
`;

const StyledEditIcon = styled(MdEdit)<{ $isDisabled: boolean }>`
  cursor: ${(props) => (props.$isDisabled ? 'not-allowed' : 'pointer')};
  color: ${(props) => (props.$isDisabled ? '#666' : '#666')};
  transition: color 0.2s;
  position: relative;
  z-index: 10;

  &:hover {
    color: ${(props) => (props.$isDisabled ? '#666' : '#1e3a8a')};
  }
`;
