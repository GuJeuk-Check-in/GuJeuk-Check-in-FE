import styled from '@emotion/styled';
import { adminTokens, grayPalette } from '@center/tokens';
import { Modal } from '@center/ui/modal';

export const ConfirmModal = styled(Modal)`
  && {
    width: min(90%, 25rem);
    padding: 2rem 2rem 1.75rem;
    border: 1px solid ${grayPalette[100]};
    border-radius: 1rem;
    box-shadow: 0 0.25rem 1.25rem rgba(0, 0, 0, 0.12);
  }

  svg {
    width: 2.25rem;
    height: 2.25rem;
    color: ${({ theme }) => adminTokens(theme).colors.error};
  }

  h2 {
    margin: 1rem 0 0.5rem;
    color: ${({ theme }) => adminTokens(theme).colors.error};
    font-size: 1.25rem;
    font-weight: 600;
  }

  p {
    margin: 0 0 1.5rem;
    color: ${({ theme }) => adminTokens(theme).colors.secondaryText};
    font-size: 0.8125rem;
  }

  button {
    flex: 1 1 0;
    min-width: 0;
    height: 2.75rem;
    padding: 0;
    border: 0;
    border-radius: 1.375rem;
    font-size: 1rem;
    font-weight: 600;
  }

  button:first-of-type {
    background-color: #eeeeee;
    color: ${grayPalette[40]};
  }

  button:first-of-type:hover {
    background-color: #e4e4e4;
  }

  div:has(> button) {
    gap: 1rem;
    flex-wrap: nowrap;
  }
`;
