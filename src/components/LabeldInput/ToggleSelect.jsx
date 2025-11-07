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
  gap: 0.5rem;
  position: relative;
  box-sizing: border-box;
`;

const Label = styled.label`
  font-size: 1.25rem;
  color: #2e2e32;
  font-weight: 500;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 0.0625rem solid #2e2e32;
  color: #6a6a6a;
  border-radius: 0.5rem;
  padding: 0.5rem 0.9375rem;
  width: calc(100% - 2rem);
  height: 2.5rem;
  cursor: pointer;

  & > svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const SelectedValue = styled.span`
  font-size: 1.25rem;
  color: #2e2e32;
`;

const OptionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  top: calc(3.5rem + 2.5rem);
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  z-index: 10;
  padding-top: 1.875rem;
  background-color: #ffffff;
  margin: 0;
  padding: 0;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 0.0625rem solid #2e2e32;
  border-radius: 0.5rem;
  padding: 0.625rem 0.9375rem;
  height: 2.5rem;
  cursor: pointer;
  transition: 0.2s;
  background-color: ${({ selected }) => (selected ? '#E9F0FF' : 'white')};

  &:hover {
    background-color: #f4f8ff;
  }
`;

const Circle = styled.div`
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  border: 0.125rem solid #0f50a0;
  background-color: ${({ selected }) => (selected ? '#0f50a0' : 'transparent')};
  transition: 0.2s;
  box-shadow: ${({ selected }) =>
    selected ? 'inset 0 0 0 0.1875rem #FFFFFF' : 'none'};
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
  color: #2e2e2e;
  font-size: 1.5rem;
`;
