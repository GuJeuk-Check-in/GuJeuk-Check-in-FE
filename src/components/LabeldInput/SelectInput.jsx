import React, { useState } from 'react';
import styled from '@emotion/styled';
import VisitFormInput from '../LabeldInput/VisitFormInput';
import SelectOptionCard from '../LabeldInput/SelectOptionCard';

const SelectInput = ({
  width,
  label,
  placeholder,
  icon,
  value, // 현재 선택된 값
  onChange, // 선택된 값이 변경될 때 호출될 함수 (부모 state를 업데이트)
  options, // [{ label: '17~19세', value: '17-19' }, ...] 형태의 옵션 배열
  cols = 4, // 옵션 카드를 몇 열로 배치할지 (기본 4열)
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder;

  // 옵션 선택 핸들러
  const handleSelect = (optionValue) => {
    onChange({ target: { value: optionValue } }); // 부모의 onChange 함수를 호출
    setIsOpen(false); // 선택 후 드롭다운 닫기
  };

  return (
    <Wrapper width={width}>
      {/* 🌟 드롭다운 헤더 (VisitFormInput 재사용) */}
      <VisitFormInput
        width="100%"
        label={label}
        // 선택된 값이 있으면 그걸 보여주고, 없으면 placeholder를 보여줌
        placeholder={placeholder}
        icon={icon}
        value={selectedLabel}
        isSelectable={true}
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        // Input 필드가 아니므로 onChange는 넘기지 않음
      />

      {/* 🌟 옵션 목록 */}
      {isOpen && (
        <OptionContainer cols={cols}>
          {options.map((option) => (
            <SelectOptionCard
              key={option.value}
              label={option.label}
              isSelected={option.value === value}
              onClick={() => handleSelect(option.value)}
            />
          ))}
        </OptionContainer>
      )}
    </Wrapper>
  );
};

export default SelectInput;

const Wrapper = styled.div`
  width: ${({ width }) => width};
  position: relative;
`;

const OptionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ cols }) => cols}, 1fr);
  gap: 15px;

  margin-top: 10px;
  padding: 10px 0;
`;
