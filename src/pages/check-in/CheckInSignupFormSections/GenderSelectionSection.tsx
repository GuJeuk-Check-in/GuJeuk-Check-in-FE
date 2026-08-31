import type { GenderType } from '@entities/visit';
import { FaMars, FaRegCheckSquare, FaVenus } from 'react-icons/fa';
import {
  FieldBlock,
  FieldLabel,
  OptionCard,
  OptionGrid,
  OptionIcon,
} from './shared';

type GenderSelectionSectionProps = {
  readonly value: GenderType | '';
  readonly onSelect: (gender: GenderType) => void;
};

const genderOptions = [
  { label: '남자', value: 'MAN', tone: 'mint', icon: <FaMars /> },
  { label: '여자', value: 'WOMAN', tone: 'pink', icon: <FaVenus /> },
] as const;

export const GenderSelectionSection = ({
  value,
  onSelect,
}: GenderSelectionSectionProps) => (
  <FieldBlock>
    <FieldLabel>
      <FaRegCheckSquare aria-hidden="true" />
      성별을 알려줘
    </FieldLabel>
    <OptionGrid $columns={2}>
      {genderOptions.map((option) => (
        <OptionCard
          key={option.label}
          type="button"
          $tone={option.tone}
          $selected={value === option.value}
          onClick={() => onSelect(option.value)}
        >
          <OptionIcon $tone={option.tone}>{option.icon}</OptionIcon>
          <span>{option.label}</span>
        </OptionCard>
      ))}
    </OptionGrid>
  </FieldBlock>
);
