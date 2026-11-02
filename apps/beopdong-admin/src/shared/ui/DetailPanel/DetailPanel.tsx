import styled from '@emotion/styled';
import { adminTokens } from '@center/tokens';

export const DetailPanel = styled.div`
  box-sizing: border-box;
  width: min(100%, 65rem);
  margin-inline: auto;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => adminTokens(theme).colors.white};
  border-radius: 1.25rem;
  box-shadow: 0 0.5rem 1.25rem rgba(0, 0, 0, 0.25);

  @media (max-width: 48rem) {
    padding: 1.5rem 1rem;
  }
`;
