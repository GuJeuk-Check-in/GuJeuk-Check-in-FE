import { adminTokens } from '@center/tokens';
import styled from '@emotion/styled';

interface PasswordButtonProps {
  content: string;
  onClick?: () => void;
  disable?: boolean;
}

export const PasswordButton = ({ content, onClick, disable = false }: PasswordButtonProps) => {
  return (
    <Container type="button" onClick={onClick} disabled={disable}>
      <Content>{content}</Content>
    </Container>
  );
};

const Container = styled.button`
  padding: 0;
  font: inherit;
  box-sizing: inherit;
  width: 10.75rem;
  height: 4.1875rem;
  border-radius: 3.125rem;
  border: 0.125rem solid ${({ theme }) => adminTokens(theme).colors.white};
  background-color: ${({ theme }) => adminTokens(theme).colors.authButton};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  flex-shrink: 0;

  &:hover {
    background-color: ${({ theme }) => adminTokens(theme).colors.authButtonHover};
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
      background-color: ${({ theme }) => adminTokens(theme).colors.authButton};
      transform: none;
    }

    &:active {
      background-color: ${({ theme }) => adminTokens(theme).colors.authButtonHover};
    }
  }

  @media (max-width: 480px) {
    max-width: 100%;
    height: 3rem;
  }
`;

const Content = styled.span`
  color: ${({ theme }) => adminTokens(theme).colors.white};
  font-size: ${({ theme }) => adminTokens(theme).typography.authButton};
  font-weight: ${({ theme }) => adminTokens(theme).typography.authButtonWeight};
  margin: 0;
  user-select: none;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => adminTokens(theme).typography.authButtonMobile};
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => adminTokens(theme).typography.authButtonSmall};
  }
`;
