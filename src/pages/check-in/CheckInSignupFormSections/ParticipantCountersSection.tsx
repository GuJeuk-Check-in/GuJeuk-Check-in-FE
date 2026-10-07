import styled from '@emotion/styled';
import { FaMars, FaVenus } from 'react-icons/fa';
import { FiMinus, FiPlus, FiUsers } from 'react-icons/fi';
import { FieldBlock, FieldLabel } from './shared';
import { toneShadow } from './sectionTokens';
import type { SignupSectionTone } from './sectionTokens';

type ParticipantCountersSectionProps = {
  readonly maleCount: number;
  readonly femaleCount: number;
  readonly onDecreaseMale: () => void;
  readonly onIncreaseMale: () => void;
  readonly onDecreaseFemale: () => void;
  readonly onIncreaseFemale: () => void;
};

export const ParticipantCountersSection = ({
  maleCount,
  femaleCount,
  onDecreaseMale,
  onIncreaseMale,
  onDecreaseFemale,
  onIncreaseFemale,
}: ParticipantCountersSectionProps) => (
  <FieldBlock>
    <FieldLabel>
      <FiUsers aria-hidden="true" />
      친구들과 함께 왔니?
    </FieldLabel>
    <CounterGrid>
      <CounterCard $tone="mint">
        <CounterLabel>
          <FaMars aria-hidden="true" />
          남자
        </CounterLabel>
        <CounterControls>
          <CounterButton
            type="button"
            aria-label="남자 인원 줄이기"
            onClick={onDecreaseMale}
          >
            <FiMinus />
          </CounterButton>
          <CounterValue>{maleCount}</CounterValue>
          <CounterButton
            type="button"
            aria-label="남자 인원 늘리기"
            onClick={onIncreaseMale}
            $primary
          >
            <FiPlus />
          </CounterButton>
        </CounterControls>
      </CounterCard>

      <CounterCard $tone="pink">
        <CounterLabel>
          <FaVenus aria-hidden="true" />
          여자
        </CounterLabel>
        <CounterControls>
          <CounterButton
            type="button"
            aria-label="여자 인원 줄이기"
            onClick={onDecreaseFemale}
          >
            <FiMinus />
          </CounterButton>
          <CounterValue>{femaleCount}</CounterValue>
          <CounterButton
            type="button"
            aria-label="여자 인원 늘리기"
            onClick={onIncreaseFemale}
            $primary
          >
            <FiPlus />
          </CounterButton>
        </CounterControls>
      </CounterCard>
    </CounterGrid>
  </FieldBlock>
);

const CounterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const CounterCard = styled.div<{ $tone: SignupSectionTone }>`
  min-height: 4.3rem;
  border-radius: 2.2rem;
  background-color: #fbfbff;
  box-shadow: 0 0.35rem 0 ${({ $tone }) => toneShadow[$tone]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 1.5rem;

  @media (max-width: 480px) {
    gap: 0.5rem;
    padding: 0 0.9rem;
  }
`;

const CounterLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  color: #222831;
  flex-shrink: 0;
  font-weight: 700;
  white-space: nowrap;

  svg {
    color: #00a89d;
    font-size: 1.2rem;
  }
`;

const CounterControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const CounterButton = styled.button<{ $primary?: boolean }>`
  width: 2.8rem;
  height: 2.8rem;
  border: 0;
  border-radius: 50%;
  background-color: ${({ $primary }) => ($primary ? '#135cad' : '#ffffff')};
  color: ${({ $primary }) => ($primary ? '#ffffff' : '#7f8a99')};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  box-shadow: 0 0.2rem 0 rgba(31, 99, 183, 0.12);
`;

const CounterValue = styled.span`
  min-width: 1.5rem;
  color: #1f63b7;
  font-size: 1.4rem;
  font-weight: 700;
  text-align: center;
`;
