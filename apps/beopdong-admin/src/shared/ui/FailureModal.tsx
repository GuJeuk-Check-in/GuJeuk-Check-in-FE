import styled from '@emotion/styled';
import { adminTokens, grayPalette } from '@center/tokens';
import { Modal } from '@center/ui/modal';

export const FailureModal = styled(Modal)`
  && {
    width: min(90%, 28rem);
    padding: 2.5rem 2rem 2rem;
    border: 1px solid ${grayPalette[100]};
    border-radius: 1rem;
    box-shadow: 0 0.25rem 1.25rem rgba(0, 0, 0, 0.12);
  }

  && svg {
    width: 3.5rem;
    height: 3.5rem;
    color: ${({ theme }) => adminTokens(theme).colors.error};
  }

  h2 {
    margin: 1rem 0 0.5rem;
    color: ${({ theme }) => adminTokens(theme).colors.error};
    font-size: 1.5rem;
    font-weight: 600;
  }

  p {
    margin: 0 0 1.75rem;
    color: ${({ theme }) => adminTokens(theme).colors.secondaryText};
    font-size: 0.9375rem;
  }

  button {
    min-width: 10rem;
    height: 3rem;
    padding: 0 2rem;
    border: 0;
    border-radius: 1.5rem;
    background-color: ${({ theme }) => adminTokens(theme).colors.error};
    color: #ffffff;
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    transition: filter 0.15s ease;
  }

  button:hover {
    filter: brightness(0.9);
  }
`;
