import styled from '@emotion/styled';
import type { ChangeEventHandler } from 'react';
import { FaBirthdayCake } from 'react-icons/fa';
import { FieldBlock, FieldLabel } from './shared';

type BirthDateInputsSectionProps = {
  readonly birthYear: string;
  readonly birthMonth: string;
  readonly birthDay: string;
  readonly onBirthYearChange: ChangeEventHandler<HTMLInputElement>;
  readonly onBirthMonthChange: ChangeEventHandler<HTMLInputElement>;
  readonly onBirthDayChange: ChangeEventHandler<HTMLInputElement>;
};

export const BirthDateInputsSection = ({
  birthYear,
  birthMonth,
  birthDay,
  onBirthYearChange,
  onBirthMonthChange,
  onBirthDayChange,
}: BirthDateInputsSectionProps) => (
  <FieldBlock>
    <FieldLabel id="birth-date-label">
      <FaBirthdayCake aria-hidden="true" />
      언제 태어났어?
    </FieldLabel>
    <BirthDateGroup aria-labelledby="birth-date-label">
      <BirthDateGrid>
        <BirthInputLabel>
          <BirthInputText>연도</BirthInputText>
          <BirthInput
            value={birthYear}
            onChange={onBirthYearChange}
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="bday-year"
            placeholder="2011"
            aria-label="태어난 연도"
          />
        </BirthInputLabel>
        <BirthInputLabel>
          <BirthInputText>월</BirthInputText>
          <BirthInput
            value={birthMonth}
            onChange={onBirthMonthChange}
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="bday-month"
            placeholder="1"
            aria-label="태어난 월"
          />
        </BirthInputLabel>
        <BirthInputLabel>
          <BirthInputText>일</BirthInputText>
          <BirthInput
            value={birthDay}
            onChange={onBirthDayChange}
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="bday-day"
            placeholder="19"
            aria-label="태어난 일"
          />
        </BirthInputLabel>
      </BirthDateGrid>
    </BirthDateGroup>
  </FieldBlock>
);

const BirthDateGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const BirthDateGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr) minmax(0, 1fr);
  gap: 0.9rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const BirthInputLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  min-width: 0;
`;

const BirthInputText = styled.span`
  color: #26364c;
  font-size: 0.86rem;
`;

const BirthInput = styled.input`
  width: 100%;
  height: 4rem;
  box-sizing: border-box;
  border: 0;
  border-radius: 1.25rem;
  background-color: #fbfbff;
  box-shadow: 0 0.35rem 0 #d6e2ef;
  color: #26364c;
  font-size: 1rem;
  outline: none;
  padding: 0 1.2rem;

  &::placeholder {
    color: #8b95a3;
  }

  &:focus {
    box-shadow: 0 0.35rem 0 #9fc4e7;
  }
`;
