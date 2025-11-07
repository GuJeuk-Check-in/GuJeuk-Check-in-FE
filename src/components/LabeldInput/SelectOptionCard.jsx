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

const CardContainer = styled.div`
  width: 100%;
  height: 3.75rem;
  padding: 0 0.9375rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 0.0625rem solid
    ${({ isSelected }) => (isSelected ? '#3F73B3' : '#D1D8E0')};
  background-color: #ffffff;
`;

const Radio = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  border: 0.125rem solid
    ${({ isSelected }) => (isSelected ? '#3F73B3' : '#9299A4')};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  &::after {
    content: '';
    display: ${({ isSelected }) => (isSelected ? 'block' : 'none')};
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 50%;
    background-color: #3f73b3;
  }
`;

const LabelText = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #2e2e32;
`;
