import styled from '@emotion/styled';
import { adminTokens, grayPalette } from '@center/tokens';
import { PasswordButton } from './PasswordButton';

export const ActionButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.625rem;
  margin-top: 1.25rem;
`;

export const ActionButton = styled(PasswordButton)`
  background-color: ${({ theme }) => adminTokens(theme).colors.primary};
  box-shadow: none;

  & > span {
    color: ${({ theme }) => adminTokens(theme).colors.black};
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

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    transform: none;
  }
`;
