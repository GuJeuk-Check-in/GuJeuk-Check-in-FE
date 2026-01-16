import styled from '@emotion/styled';
import React from 'react';

interface PasswordButtonProps {
  content: string;
  onClick?: () => void;
  disable?: boolean;
}

const PasswordButton = ({ content, onClick }: PasswordButtonProps) => {
  return (
    <Container
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      <Content>{content}</Content>
    </Container>
  );
};

export default PasswordButton;

const Container = styled.div`
  width: 10.75rem;
  height: 4.1875rem;
  border-radius: 3.125rem;
  border: 0.125rem solid #ffffff;
  background-color: #3d72b3;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  flex-shrink: 0;

  &:hover {
    background-color: #c2d5ec;
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 280px;
    height: 3.5rem;

    &:hover {
      background-color: #3d72b3;
      transform: none;
    }

    &:active {
      background-color: #c2d5ec;
    }
  }

  @media (max-width: 480px) {
    max-width: 100%;
    height: 3rem;
  }
`;

const Content = styled.span`
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
  user-select: none;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;
