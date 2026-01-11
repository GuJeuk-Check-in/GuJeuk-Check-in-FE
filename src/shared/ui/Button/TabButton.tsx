import styled from '@emotion/styled';
import React from 'react';

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton = ({ label, isActive, onClick }: TabButtonProps) => {
  return (
    <Button active={isActive} onClick={onClick}>
      {label}
    </Button>
  );
};

export default TabButton;

interface ButtonProps {
  active: boolean;
}

const Button = styled.button<ButtonProps>`
  width: 300px;
  height: 70px;
  border-radius: 50px;
  border: 2px solid ${({ active }) => (active ? '#0F50A0' : '#95D5F8')};
  background-color: ${({ active }) => (active ? '#3F73B3' : '#FFFFFF')};
  color: ${({ active }) => (active ? '#FFFFFF' : '#95D5F8')};
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #0f50a0;
    color: ${({ active }) => (active ? '#FFFFFF' : '#0F50A0')};
  }
`;
