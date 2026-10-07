import styled from '@emotion/styled';

export const FieldBlock = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const FieldLabel = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin: 0;
  color: #26364c;
  font-family: 'Pretendard', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;

  svg {
    color: #1f63b7;
  }
`;

export const OptionGrid = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 920px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;
