import PasswordButton from '../Button/PasswordButton';
import styled from '@emotion/styled';
import React from 'react';

interface RightPageProps {
  title?: string;
  children?: React.ReactNode;
  buttonContent?: string;
  onClick?: () => void;
}

const RightPage = ({
  title,
  children,
  buttonContent,
  onClick,
}: RightPageProps) => {
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

export default RightPage;

const Container = styled.div`
  background-color: #0f50a0;
  width: 35.89vw;
  min-width: 400px;
  height: 74.63vh;
  border-radius: 0 20px 20px 0;
  padding: 40px 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    min-height: 50vh;
    border-radius: 0 0 20px 20px;
    padding: 30px 20px;
  }
`;

const Title = styled.p`
  font-size: 2.5rem;
  font-weight: 300;
  color: #ffffff;
  font-family: 'Jua', sans-serif;
  text-align: center;

  margin: 0 0 2.5rem 0;
  flex-shrink: 0;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonFixer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;
