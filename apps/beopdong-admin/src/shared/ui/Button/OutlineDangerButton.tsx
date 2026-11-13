import styled from '@emotion/styled';
import { adminTokens } from '@center/tokens';

export const OutlineDangerButton = styled.button`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
  gap: 16px;
  width: 200px;
  height: 56px;
  background: ${({ theme }) => adminTokens(theme).colors.warning}66;
  border: 4px solid ${({ theme }) => adminTokens(theme).colors.error};
  border-radius: 40px;
  flex: none;
  color: ${({ theme }) => adminTokens(theme).colors.error};
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => adminTokens(theme).colors.primaryDark};
  }
`;
