import styled from '@emotion/styled';
import React from 'react';

interface HeaderButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export const HeaderButton = ({ children, onClick }: HeaderButtonProps) => {
  return <Button onClick={onClick}>{children}</Button>;
};

const Button = styled.button`
  border: none;
  background: none;
  font-size: 1.5rem;
  font-weight: 400;
  color: #565656;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #000000;
  }
`;
