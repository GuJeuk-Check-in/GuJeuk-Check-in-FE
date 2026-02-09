import { PasswordButton } from '@shared/ui/Button/index';
import styled from '@emotion/styled';
import React from 'react';

interface RightLayoutProps {
  title?: string;
  children?: React.ReactNode;
  buttonContent?: string;
  onClick?: () => void;
}

export const RightLayout = ({
  title,
  children,
  buttonContent,
  onClick,
}: RightLayoutProps) => {
  return (
    <Container>
      {title && <Title>{title}</Title>}
      <ContentWrapper>{children}</ContentWrapper>
      {buttonContent && (
        <ButtonFixer>
          <PasswordButton content={buttonContent} onClick={onClick} />
        </ButtonFixer>
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: #0f50a0;
  width: 35.89vw;
  height: 74.63vh;
  border-radius: 0 20px 20px 0;
  padding: 40px 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  box-shadow: 0 6px 10px rgb(207, 220, 235);

  @media (max-width: 1024px) {
    width: 50%;
    height: 60vh;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    border-radius: 0 0 20px 20px;
    padding: 30px 20px;
    gap: 15px;
  }

  @media (max-width: 480px) {
    padding: 20px 15px;
    gap: 12px;
  }
`;

const Title = styled.p`
  font-size: 2.5rem;
  font-weight: 300;
  color: #ffffff;
  font-family: 'Jua', sans-serif;
  text-align: center;
  margin: 0;
  flex-shrink: 0;
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-height: 60vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  @media (max-width: 768px) {
    max-height: none;
    overflow-y: visible;
  }
`;

const ButtonFixer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 0;
  flex-shrink: 0;
`;
