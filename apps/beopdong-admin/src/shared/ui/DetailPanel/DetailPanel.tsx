import styled from '@emotion/styled';
import { adminTokens } from '@center/tokens';

export const DetailPanel = styled.div`
  position: relative;
  box-sizing: border-box;
  width: min(calc(88% + 15px), 70rem);
  margin-inline: auto;
  padding: 2.5rem 8% 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: ${({ theme }) => adminTokens(theme).colors.white};
  border-radius: 1.25rem;
  box-shadow: 0 0.5rem 1.25rem rgba(0, 0, 0, 0.25);

  &:has([data-back-link]) {
    padding-top: 6.5rem;
  }

  @media (max-width: 64rem) {
    width: 100%;
    padding: 2.5rem 2rem;

    &:has([data-back-link]) {
      padding-top: 6.5rem;
    }
  }

  @media (max-width: 48rem) {
    padding: 1.5rem 1rem;

    &:has([data-back-link]) {
      padding-top: 4.5rem;
    }
  }
`;
