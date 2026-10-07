import styled from '@emotion/styled';
import { FiHome, FiSearch } from 'react-icons/fi';
import { FieldBlock, FieldLabel } from './shared';

type ResidenceSelectorSectionProps = {
  readonly residence: string;
  readonly onOpen: () => void;
};

export const ResidenceSelectorSection = ({
  residence,
  onOpen,
}: ResidenceSelectorSectionProps) => {
  const buttonLabel = residence || '너가 살고 있는 동네를 알려줘';

  return (
    <FieldBlock>
      <FieldLabel>
        <FiHome aria-hidden="true" />
        어디 살아?
      </FieldLabel>
      <ResidenceButton
        type="button"
        $hasValue={!!residence}
        onClick={onOpen}
        aria-label={buttonLabel}
      >
        <FiSearch aria-hidden="true" />
        {residence ? (
          <span>{residence}</span>
        ) : (
          <>
            <DesktopPlaceholder aria-hidden="true">
              너가 살고 있는 동네를 알려줘
            </DesktopPlaceholder>
            <MobilePlaceholder aria-hidden="true">
              사는 동네를 알려줘
            </MobilePlaceholder>
          </>
        )}
      </ResidenceButton>
    </FieldBlock>
  );
};

const ResidenceButton = styled.button<{ $hasValue: boolean }>`
  width: 100%;
  height: 4rem;
  box-sizing: border-box;
  border: 0;
  border-radius: 2rem;
  background-color: #fbfbff;
  box-shadow: 0 0.35rem 0 #d6e2ef;
  color: ${({ $hasValue }) => ($hasValue ? '#26364c' : '#747b86')};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.6rem;
  font-family: inherit;
  font-size: 1rem;
  padding: 0 1.8rem;
  text-align: left;

  svg {
    color: #1f63b7;
    flex-shrink: 0;
  }
`;

const DesktopPlaceholder = styled.span`
  @media (max-width: 560px) {
    display: none;
  }
`;

const MobilePlaceholder = styled.span`
  display: none;

  @media (max-width: 560px) {
    display: inline;
    white-space: nowrap;
  }
`;
