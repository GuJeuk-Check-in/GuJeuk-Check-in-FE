import { useState } from 'react';
import styled from '@emotion/styled';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';

const ToggleSelect = ({ label, options, value, onChange, width = '200px' }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <Box onClick={() => setOpen((prev) => !prev)} width={width}>
        <SelectedValue>{value || `${label} 선택`}</SelectedValue>
        {open ? <IoMdArrowDropup size={20} /> : <IoMdArrowDropdown size={20} />}
      </Box>

      {open && (
        <OptionContainer width={width}>
          {options.map((option) => (
            <Option
              key={option}
              onClick={() => handleSelect(option)}
              selected={value === option}
            >
              <Circle selected={value === option} />
              <span>{option}</span>
            </Option>
          ))}
        </OptionContainer>
      )}
    </Container>
  );
};

export default ToggleSelect;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 20px;
  color: #2e2e32;
  font-weight: 500;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #2e2e32;
  border-radius: 8px;
  padding: 10px 15px;
  width: ${({ width }) => width};
  height: 40px;
  cursor: pointer;
  background-color: white;
`;

const SelectedValue = styled.span`
  font-size: 20px;
  color: #2e2e32;
`;

const OptionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-top: 8px;
  width: ${({ width }) => width};
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #2e2e32;
  border-radius: 8px;
  padding: 10px 15px;
  height: 40px;
  cursor: pointer;
  transition: 0.2s;
  background-color: ${({ selected }) => (selected ? '#E9F0FF' : 'white')};

  &:hover {
    background-color: #f4f8ff;
  }
`;

const Circle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #0f50a0;
  background-color: ${({ selected }) => (selected ? '#0f50a0' : 'transparent')};
  transition: 0.2s;
`;
