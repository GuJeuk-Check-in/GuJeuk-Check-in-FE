// SelectOptionCard.jsx

import React from 'react';
import styled from '@emotion/styled';

const SelectOptionCard = ({ label, isSelected, onClick }) => {
  return (
    <CardContainer isSelected={isSelected} onClick={onClick}>
      <Radio isSelected={isSelected} />
      <LabelText>{label}</LabelText>
    </CardContainer>
  );
};

export default SelectOptionCard;

// --- 스타일 정의 ---

const CardContainer = styled.div`
  width: 100%; /* 부모 컨테이너가 너비를 결정합니다. */
  height: 60px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  gap: 12px;

  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  /* 🌟 선택 상태에 따라 파란색 테두리 적용 */
  border: 1px solid ${({ isSelected }) => (isSelected ? '#3F73B3' : '#D1D8E0')};
  background-color: #ffffff;
`;

const Radio = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${({ isSelected }) => (isSelected ? '#3F73B3' : '#9299A4')};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  /* 🌟 선택 시 파란색 동그라미 (내부 채우기) */
  &::after {
    content: '';
    display: ${({ isSelected }) => (isSelected ? 'block' : 'none')};
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #3f73b3;
  }
`;

const LabelText = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #2e2e32;
`;
