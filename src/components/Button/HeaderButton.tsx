import styled from '@emotion/styled';
import React from 'react';

interface HeaderButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const HeaderButton = ({ children, onClick }: HeaderButtonProps) => {
  return <Button onClick={onClick}>{children}</Button>;
};

export default HeaderButton;

const Button = styled.button`
  border: none;
  background: none;
  font-size: 1.25rem;
  color: #565656;
  cursor: pointer;
`;
