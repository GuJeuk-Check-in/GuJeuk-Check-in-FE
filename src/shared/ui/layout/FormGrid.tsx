import styled from '@emotion/styled';

export const FormGrid = styled.div<{ cols?: number }>`
  display: grid;
  width: 100%;
  grid-template-columns: ${({ cols }) =>
    cols ? `repeat(${cols}, 1fr)` : '1fr'};
  gap: 1.25rem;
  align-items: flex-start;
`;
