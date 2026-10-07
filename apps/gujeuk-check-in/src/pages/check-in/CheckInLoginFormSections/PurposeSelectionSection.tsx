import styled from '@emotion/styled';
import { IoRocketOutline } from 'react-icons/io5';
import { FieldBlock, FieldLabel, OptionGrid } from './shared';
import {
  selectedBackground,
  selectedRing,
  toneColor,
  toneShadow,
} from './sectionTokens';
import type { LoginPurposeTone } from './sectionTokens';

type PurposeOption = {
  readonly label: string;
  readonly tone: LoginPurposeTone;
};

type PurposeSelectionSectionProps = {
  readonly options: readonly PurposeOption[];
  readonly selectedIndex: number | null;
  readonly isLoading: boolean;
  readonly isError: boolean;
  readonly onSelect: (index: number, label: string) => void;
};

export const PurposeSelectionSection = ({
  options,
  selectedIndex,
  isLoading,
  isError,
  onSelect,
}: PurposeSelectionSectionProps) => (
  <FieldBlock>
    <FieldLabel>
      <IoRocketOutline aria-hidden="true" />
      오늘은 무엇을 하러 왔어?
    </FieldLabel>
    {options.length > 0 ? (
      <OptionGrid $columns={5}>
        {options.map((option, index) => (
          <PurposeCard
            key={`${option.label}-${index}`}
            type="button"
            $tone={option.tone}
            $selected={selectedIndex === index}
            onClick={() => onSelect(index, option.label)}
          >
            {option.label}
          </PurposeCard>
        ))}
      </OptionGrid>
    ) : (
      <PurposeNotice>
        {isLoading
          ? '방문 목적을 불러오는 중입니다.'
          : isError
          ? '방문 목적을 불러오지 못했습니다.'
          : '등록된 방문 목적이 없습니다.'}
      </PurposeNotice>
    )}
  </FieldBlock>
);

const PurposeCard = styled.button<{
  $tone: LoginPurposeTone;
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
  font-size: clamp(0.72rem, 0.8vw, 0.82rem);
  font-weight: ${({ $selected }) => ($selected ? 800 : 600)};
  letter-spacing: 0;
  line-height: 1;
  overflow: hidden;
  padding: 0 0.5rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PurposeNotice = styled.p`
  min-height: 4rem;
  border-radius: 1.3rem;
  background-color: #fbfbff;
  box-shadow: 0 0.35rem 0 #ccd9ea;
  color: #26364c;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0 1rem;
  font-size: 1rem;
  font-weight: 700;
`;
