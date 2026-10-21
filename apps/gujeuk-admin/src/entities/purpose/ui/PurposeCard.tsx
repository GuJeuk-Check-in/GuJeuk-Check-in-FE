import {
  TileContainer as Container,
  TileDeleteIcon as DeleteIcon,
  TileLabel as Label,
  TileEditInput as EditInput,
  TileStyledEditIcon as StyledEditIcon,
} from '@center/ui/card';
import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface Purpose {
  id: number;
  purpose: string;
}

interface PurposeProps {
  purpose: Purpose;
  index: number;
  onDelete: (id: number) => void;
  onUpdate: (params: { id: number; newPurpose: string }) => void;
  isDeleting: boolean;
}

export const PurposeCard = ({
  index,
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
          {index}. {purpose.purpose}
          <StyledEditIcon
            size={18}
            onClick={() => {
              if (!isDeleting) {
                setIsEditing(true);
              }
            }}
            onPointerDown={preventDrag}
            onMouseDown={preventDrag}
            isDeleting={isDeleting}
          />
        </Label>
      )}
    </Container>
  );
};
