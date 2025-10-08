import { useState } from 'react';
import styled from '@emotion/styled';
import { FaTransgender, FaFemale, FaMale } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const GenderInput = ({ value, onChange, width = '100%' }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (gender) => {
    onChange(gender);
    setOpen(false);
  };

  return (
    <Container width={width}>
      <Label>성별</Label>

      {/* 드롭다운 헤더 */}
      <DropdownContainer>
        <DropdownHeader onClick={() => setOpen(!open)} $selected={!!value}>
          <LeftSide>
            <FaTransgender size={20} color="#404040" />
            <Placeholder>{value || '성별을 선택해주세요'}</Placeholder>
          </LeftSide>
          {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </DropdownHeader>

        {open && (
          <DropdownList>
            <Option
              $active={value === '여성'}
              $color="#d4a1a1"
              onClick={() => handleSelect('여성')}
            >
              <FaFemale
                size={60}
                color={value === '여성' ? '#fff' : '#D88282'}
              />
              <OptionText $active={value === '여성'}>여성</OptionText>
            </Option>

            <Option
              $active={value === '남성'}
              $color="#517eb5"
              onClick={() => handleSelect('남성')}
            >
              <FaMale size={60} color={value === '남성' ? '#fff' : '#0F50A0'} />
              <OptionText $active={value === '남성'}>남성</OptionText>
            </Option>
          </DropdownList>
        )}
      </DropdownContainer>
    </Container>
  );
};

export default GenderInput;

const Container = styled.div`
  width: ${({ width }) => width};
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 20px;
  color: #2e2e32;
  margin-bottom: 2px;
  margin-top: 20px;
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 60px;
  border: 1px solid #404040;
  border-radius: 8px;
  font-size: 18px;
  background-color: #ffffff;
  cursor: pointer;
  color: ${({ $selected }) => ($selected ? '#2e2e32' : '#6A6A6A')};
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Placeholder = styled.span`
  font-size: 18px;
`;

const DropdownList = styled.div`
  position: absolute;
  top: 60px;
  width: 96.3%;
  background-color: #ffffff;
  border: 1px solid #404040;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 16px;
  z-index: 10;
`;

const Option = styled.div`
  flex: 1;
  height: 140px;
  border-radius: 16px;
  border: 2px solid ${({ $color }) => $color};
  background-color: ${({ $active, $color }) => ($active ? $color : '#ffffff')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background-color: ${({ $color }) => $color};
    color: #ffffff;

    svg {
      color: #ffffff;
    }
  }
`;

const OptionText = styled.span`
  margin-top: 8px;
  font-size: 18px;
  font-weight: 600;
  color: ${({ $active }) => ($active ? '#ffffff' : '#2e2e32')};
`;
