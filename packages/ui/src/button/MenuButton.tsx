import { adminTokens } from '@center/tokens';
import styled from '@emotion/styled';
import React from 'react';

interface MenuButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  'aria-current'?: 'page';
}

export const MenuButton = ({ children, onClick, className, 'aria-current': current }: MenuButtonProps) => {
  return <Button onClick={onClick} className={className} aria-current={current}>{children}</Button>;
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
    color: ${({ theme }) => adminTokens(theme).colors.black};
  }
`;
