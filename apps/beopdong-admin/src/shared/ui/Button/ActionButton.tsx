import styled from '@emotion/styled';
import { adminTokens, grayPalette, orangePalette } from '@center/tokens';
import { PasswordButton } from './PasswordButton';

export const ActionButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
  margin-top: 1.25rem;
`;

export const ActionButton = styled(PasswordButton)`
  height: 3.6rem;
  background-color: ${({ theme }) => adminTokens(theme).colors.primary};
  box-shadow: none;

  & > span {
    color: ${({ theme }) => adminTokens(theme).colors.black};
    font-size: 1.3rem;
    font-weight: 600;
  }

  &:hover {
    background-color: ${({ theme }) => adminTokens(theme).colors.primaryDark};
  }

  &:disabled,
  &:disabled:hover {
    background-color: ${grayPalette[60]};
    cursor: not-allowed;
    transform: none;
  }

  &:disabled > span {
    color: ${grayPalette[30]};
  }

  @media (max-width: 768px) {
    height: 3.25rem;

    & > span {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 480px) {
    height: 3rem;

    & > span {
      font-size: 0.95rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    transform: none;
  }
`;

export const EditButton = styled(ActionButton)`
  border-width: 0.25rem;
  border-color: ${({ theme }) => adminTokens(theme).colors.primary};
  background-color: ${({ theme }) => adminTokens(theme).colors.white};

  & > span {
    color: ${({ theme }) => adminTokens(theme).colors.primaryDark};
  }

  &:hover {
    background-color: ${({ theme }) => adminTokens(theme).colors.primaryLight};
  }
`;

export const CancelButton = styled(ActionButton)`
  border-color: transparent;
  background-color: ${({ theme }) => adminTokens(theme).colors.white};
  box-shadow: 0.25rem 0.25rem 0 #e0e0e0;

  & > span {
    color: ${({ theme }) => adminTokens(theme).colors.primary};
  }

  &:hover {
    background-color: #cccccc;
  }

  &:hover > span {
    color: ${orangePalette.mainPressed};
  }

  &:active {
    background-color: #a3a3a3;
    box-shadow: 0.25rem 0.25rem 0 #e0e0e0;
  }

  &:active > span {
    color: ${({ theme }) => adminTokens(theme).colors.primaryDark};
  }
`;
