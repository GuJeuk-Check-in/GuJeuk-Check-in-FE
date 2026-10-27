import styled from '@emotion/styled';
import { adminTokens } from '@center/tokens';
import { FaCheck } from 'react-icons/fa6';

interface UsageSeatChipsProps {
  readonly seatCount: number;
  readonly selected: number;
  readonly onSelect: (seat: number) => void;
}

export const UsageSeatChips = ({ seatCount, selected, onSelect }: UsageSeatChipsProps) => {
  const seats = Array.from({ length: seatCount }, (_, index) => index + 1);

  return (
    <Container>
      <Heading id="usage-seat-heading">좌석번호</Heading>
      <Chips role="radiogroup" aria-labelledby="usage-seat-heading">
        {seats.map((seat) => (
          <Chip
            key={seat}
            type="button"
            role="radio"
            aria-checked={seat === selected}
            $active={seat === selected}
            onClick={() => onSelect(seat)}
          >
            {seat === selected && <FaCheck size="12px" aria-hidden="true" />}
            {String(seat).padStart(2, '0')}
          </Chip>
        ))}
      </Chips>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Heading = styled.h2`
  margin: 0;
  color: ${({ theme }) => adminTokens(theme).colors.text};
  font-size: 20px;
  font-weight: 700;
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Chip = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-width: 72px;
  height: 48px;
  padding: 0 16px;
  box-sizing: border-box;
  border: 1px solid ${({ theme, $active }) => $active
    ? adminTokens(theme).colors.primary
    : adminTokens(theme).colors.secondaryText};
  border-radius: 24px;
  background-color: ${({ theme, $active }) => $active
    ? adminTokens(theme).colors.primaryLight
    : adminTokens(theme).colors.white};
  color: ${({ theme, $active }) => $active
    ? adminTokens(theme).colors.primaryDark
    : adminTokens(theme).colors.secondaryText};
  font: inherit;
  font-size: 18px;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => adminTokens(theme).colors.primaryDark};
    outline-offset: 2px;
  }
`;
