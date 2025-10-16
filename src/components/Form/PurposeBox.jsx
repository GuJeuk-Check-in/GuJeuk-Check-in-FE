import styled from '@emotion/styled';
import { MdEdit } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { useState } from 'react';
import usePurposeStore from '../../store/PurposeStore';

const PurposeBox = ({ purpose }) => {
  const { updatePurpose, removePurpose } = usePurposeStore();
  const [isEditing, setIsEditing] = useState(false);
  const [newLabel, setNewLabel] = useState(purpose.label);

  const handleUpdate = () => {
    if (newLabel.trim()) {
      updatePurpose(purpose.id, newLabel);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`'${purpose.label}' 목적을 삭제하시겠습니까?`)) {
      removePurpose(purpose.id);
    }
  };

  return (
    <Container>
      <DeleteIcon onClick={handleDelete}>
        <IoClose size={20} />
      </DeleteIcon>

      {isEditing ? (
        <EditInput
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          onBlur={handleUpdate}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleUpdate();
            if (e.key === 'Escape') handleCancel();
          }}
          autoFocus
        />
      ) : (
        <Label>
          {purpose.label}{' '}
          <MdEdit size={18} onClick={() => setIsEditing(true)} />
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
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
`;

const DeleteIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 12px;
  color: #dc7676;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const Label = styled.span`
  display: flex;
  align-items: center;
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
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  border: none;
  border-bottom: 2px solid #1e3a8a;
  outline: none;
  width: 70%;
  color: #2e2e32;
`;
