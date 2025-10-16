import { useState } from 'react';
import styled from '@emotion/styled';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const ToggleSelect = ({ label, options, value, onChange, icon }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <Box onClick={() => setOpen((prev) => !prev)}>
        <Icon>{icon}</Icon>
        <SelectedValue>{value || `${label} 선택`}</SelectedValue>
        {open ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
      </Box>

      {open && (
        <OptionContainer>
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
  width: 100%;
  height: auto;
  flex-direction: column;
  gap: 8px;
  position: relative;
  box-sizing: border-box;
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
  color: #6a6a6a;
  border-radius: 8px;
  padding: 8px 15px;
  width: calc(100% - 32px);
  height: 40px;
  cursor: pointer;
`;

const SelectedValue = styled.span`
  font-size: 20px;
  color: #2e2e32;
`;

const OptionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  top: calc(56px + 8px);
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  z-index: 10;
  padding-top: 30px;
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
  box-shadow: ${({ selected }) =>
    selected ? 'inset 0 0 0 3px #FFFFFF' : 'none'};
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  color: #6a6a6a;
  font-size: 24px;
`;
