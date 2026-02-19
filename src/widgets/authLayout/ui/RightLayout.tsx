import styled from '@emotion/styled';
import React from 'react';

interface RightLayoutProps {
  title?: string;
  children?: React.ReactNode;
  buttonContent?: string;
  spacer?: 40 | 80;
  onClick?: () => void;
}

export const RightLayout = ({
  title,
  children,
  spacer,
}: RightLayoutProps) => {
  return (
    <Container spacer={spacer}>
      {title && <Title>{title}</Title>}
      <ContentWrapper>{children}</ContentWrapper>
    </Container>
  );
};

const Container = styled.div<Pick<RightLayoutProps, "spacer">>`
  background-color: #0F50A0;
  width: 37.5vw;
  height: 74.44vh;
  border-radius: 20px;
  padding: 40px 154px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ spacer }) => spacer ?? 80}px;
  box-shadow: 0 6px 10px rgb(207, 220, 235);

  @media (max-width: 1800px) {
    padding: 40px 100px;
  }


  @media (max-width: 1600px) {
    width: 40%;
    padding: 40px 75px;
  }

  @media (max-width: 1300px) {
    width: 45%;
    padding: 40px 50px;
  }

  @media (max-width: 1024px) {
    width: 50%;
    height: 60vh;
    padding: 40px 50px;
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
  white-space: nowrap;
  font-size: 2.5rem;
  font-weight: 300;
  color: #FFFFFF;
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
  overflow: visible;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  @media (max-width: 1800px) {
    max-height: none;
    overflow-y: auto;
  }

  @media (max-width: 768px) {
    max-height: none;
    overflow-y: auto;
  }
`;

const ButtonFixer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 0;
  flex-shrink: 0;
`;
