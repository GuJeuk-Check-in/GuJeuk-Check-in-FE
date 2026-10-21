import { adminTokens } from '@center/tokens';
import styled from '@emotion/styled';
import type React from 'react';

interface RightLayoutProps {
  title?: string;
  children?: React.ReactNode;
  buttonContent?: string;
  spacer?: 40 | 70;
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
  background-color: ${({ theme }) => adminTokens(theme).colors.primary};
  overflow-x: visible;
  width: 37.5vw;
  height: 74.44vh;
  border-radius: ${({ theme }) => adminTokens(theme).components.authPanelRadius};
  padding: 40px 133px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ spacer }) => spacer ?? 70}px;
  box-shadow: 0 6px 10px ${({ theme }) => adminTokens(theme).colors.authPanelShadow};

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
  font-size: ${({ theme }) => adminTokens(theme).typography.authTitle};
  font-weight: ${({ theme }) => adminTokens(theme).typography.authTitleWeight};
  color: ${({ theme }) => adminTokens(theme).colors.white};
  font-family: ${({ theme }) => adminTokens(theme).typography.titleFamily};
  text-align: center;
  margin: 0;
  flex-shrink: 0;
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => adminTokens(theme).typography.authTitleMobile};
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => adminTokens(theme).typography.authTitleSmall};
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
