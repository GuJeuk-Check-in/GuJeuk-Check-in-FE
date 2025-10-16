import styled from '@emotion/styled';
import { MdAdd, MdClose, MdCheck } from 'react-icons/md';
import { useState } from 'react';
import usePurposeStore from '../../store/PurposeStore';

const PurposeAddBox = () => {
  const { addPurpose } = usePurposeStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newLabel, setNewLabel] = useState('');

  const handleAdd = () => {
    if (newLabel.trim()) {
      addPurpose(newLabel.trim());
      setNewLabel('');
      setIsAdding(false);
    } else {
      alert('목적을 입력해주세요.');
    }
  };

  if (!isAdding) {
    return (
      <Container isAddButton onClick={() => setIsAdding(true)}>
        <MdAdd size={48} color="#007bff" />
      </Container>
    );
  }

  return (
    <Container>
      <AddInput
        type="text"
        placeholder="새 목적 입력"
        value={newLabel}
        onChange={(e) => setNewLabel(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        autoFocus
      />
      <IconSection>
        <MdCheck
          size={26}
          color="#007bff"
          style={{ cursor: 'pointer' }}
          onClick={handleAdd}
        />
        <MdClose
          size={26}
          color="#dc3545"
          style={{ cursor: 'pointer' }}
          onClick={() => setIsAdding(false)}
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
  justify-content: ${({ isAddButton }) =>
    isAddButton ? 'center' : 'space-between'};
  padding: ${({ isAddButton }) => (isAddButton ? '0' : '0 16px')};
  background-color: #ffffff;
  border: ${({ isAddButton }) =>
    isAddButton ? '2px dashed #6f95c4' : '1px solid #6f95c4'};
  cursor: ${({ isAddButton }) => (isAddButton ? 'pointer' : 'default')};
  box-sizing: border-box;
  margin: 0 auto 15px auto;
  transition: 0.2s ease;

  &:hover {
    background-color: ${({ isAddButton }) =>
      isAddButton ? '#f9fbff' : '#ffffff'};
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
`;

const IconSection = styled.div`
  display: flex;
  gap: 15px;
`;
