import { adminTokens } from '@center/tokens';
import styled from '@emotion/styled';
import { MdEdit } from 'react-icons/md';
export const TileContainer = styled.div<{ isDisabled: boolean }>`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => adminTokens(theme).colors.white};
  border-radius: 1.25rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 500;
  color: #3a3a3a;
  opacity: ${(props) => (props.isDisabled ? 0.7 : 1)};
  box-shadow: 0 0.125rem 0.375rem rgba(0, 0, 0, 0.08);
`;

export const TileDeleteIcon = styled.button<{ isDeleting: boolean }>`
  background: none;
  border: none;
  padding: 0;
  outline: none;
  position: absolute;
  top: 0.625rem;
  right: 0.75rem;
  color: ${(props) => (props.isDeleting ? '#aaaaaa' : '#dc7676')};
  cursor: ${(props) => (props.isDeleting ? 'not-allowed' : 'pointer')};
  transition: 0.2s ease;
  z-index: 10;

  &:hover {
    transform: ${(props) => (props.isDeleting ? 'none' : 'scale(1.1)')};
  }
`;

export const TileLabel = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  gap: 0.375rem;
`;

export const TileEditInput = styled.input`
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  border: none;
  border-bottom: 0.125rem solid ${({ theme }) => adminTokens(theme).colors.primaryDark};
  outline: none;
  width: 80%;
  color: ${({ theme }) => adminTokens(theme).colors.text};
  padding: 0;
`;

export const TileStyledEditIcon = styled(MdEdit)<{ isDeleting: boolean }>`
  cursor: ${(props) => (props.isDeleting ? 'not-allowed' : 'pointer')};
  color: ${(props) => (props.isDeleting ? '#666' : '#666')};
  transition: color 0.2s;
  position: relative;
  z-index: 10;

  &:hover {
    color: ${({ isDeleting, theme }) => (isDeleting ? '#666' : adminTokens(theme).colors.primaryDark)};
  }
`;
