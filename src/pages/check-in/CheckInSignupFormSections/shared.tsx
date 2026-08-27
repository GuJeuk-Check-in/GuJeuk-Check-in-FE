import styled from '@emotion/styled';
import { selectedBackground, selectedRing, toneColor, toneShadow } from './sectionTokens';
import type { SignupSectionTone } from './sectionTokens';

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

export const TextInput = styled.input`
  width: 100%;
  height: 4rem;
  box-sizing: border-box;
  border: 0;
  border-radius: 2rem;
  background-color: #fbfbff;
  box-shadow: 0 0.35rem 0 #d6e2ef;
  color: #26364c;
  font-size: 1rem;
  outline: none;
  padding: 0 1.8rem;

  &::placeholder {
    color: #747b86;
  }

  &:focus {
    box-shadow: 0 0.35rem 0 #9fc4e7;
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

export const OptionCard = styled.button<{
  $tone: SignupSectionTone;
  $selected?: boolean;
}>`
  min-height: 6.6rem;
  border: 0.15rem solid
    ${({ $selected, $tone }) => ($selected ? toneColor[$tone] : 'transparent')};
  border-radius: 1.3rem;
  background-color: ${({ $selected, $tone }) =>
    $selected ? selectedBackground[$tone] : '#fbfbff'};
  box-shadow: 0 0.35rem 0 ${({ $tone }) => toneShadow[$tone]},
    ${({ $selected, $tone }) =>
      $selected
        ? `0 0 0 0.22rem ${selectedRing[$tone]}`
        : '0 0 0 0 transparent'};
  color: #222831;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 0.85rem;
`;

export const OptionIcon = styled.span<{ $tone: SignupSectionTone }>`
  color: ${({ $tone }) => toneColor[$tone]};
  font-size: 1rem;
`;
