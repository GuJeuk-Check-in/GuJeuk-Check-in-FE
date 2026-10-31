import styled from '@emotion/styled';
import { adminTokens } from '@center/tokens';

export const DeleteButton = styled.button`
  box-sizing: border-box;
  display: flex;
  flex: none;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 10.5rem;
  height: 3.75rem;
  padding: 0 2.5rem;
  border: 0.25rem solid ${({ theme }) => adminTokens(theme).colors.error};
  border-radius: 2.5rem;
  background: ${({ theme }) => adminTokens(theme).colors.warning}66;
  color: ${({ theme }) => adminTokens(theme).colors.error};
  font: inherit;
  font-size: 1.25rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => adminTokens(theme).colors.warning}99;
  }

  &:focus-visible {
    outline: 0.125rem solid ${({ theme }) => adminTokens(theme).colors.primaryDark};
    outline-offset: 0.25rem;
  }
`;
