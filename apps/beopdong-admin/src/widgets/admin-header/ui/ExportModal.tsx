import { useState, type KeyboardEvent } from 'react';
import styled from '@emotion/styled';
import { adminTokens } from '@center/tokens';
import { FormModal } from '@shared/ui/FormModal';

const PERIOD_OPTIONS = ['일계', '월계', '상반기', '하반기'] as const;

interface ExportModalProps {
  readonly title: string;
  readonly onConfirm: (period: string) => void;
  readonly onClose: () => void;
}

export const ExportModal = ({ title, onConfirm, onClose }: ExportModalProps) => {
  const [period, setPeriod] = useState<string>(PERIOD_OPTIONS[0]);

  const handlePeriodKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const steps: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    const step = steps[event.key];
    if (!step) return;
    event.preventDefault();
    const current = PERIOD_OPTIONS.indexOf(period as (typeof PERIOD_OPTIONS)[number]);
    const next = PERIOD_OPTIONS[(current + step + PERIOD_OPTIONS.length) % PERIOD_OPTIONS.length];
    setPeriod(next);
    event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]')[PERIOD_OPTIONS.indexOf(next)]?.focus();
  };

  return (
    <FormModal title={title} subtitle="내려받을 기간을 선택해주세요" onConfirm={() => onConfirm(period)} onClose={onClose}>
      <Periods role="radiogroup" aria-label="내려받을 기간" onKeyDown={handlePeriodKeyDown}>
        {PERIOD_OPTIONS.map((option) => (
          <PeriodButton
            key={option}
            type="button"
            role="radio"
            aria-checked={period === option}
            tabIndex={period === option ? 0 : -1}
            $selected={period === option}
            onClick={() => setPeriod(option)}
          >
            {option}
          </PeriodButton>
        ))}
      </Periods>
    </FormModal>
  );
};

const Periods = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const PeriodButton = styled.button<{ $selected: boolean }>`
  box-sizing: border-box;
  min-width: 5rem;
  padding: 0.7rem 1.25rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  background-color: ${({ theme }) => adminTokens(theme).colors.white};
  color: ${({ $selected, theme }) => ($selected ? adminTokens(theme).colors.primaryDark : adminTokens(theme).colors.primary)};
  border: 0.1875rem solid ${({ $selected, theme }) => ($selected ? adminTokens(theme).colors.primary : 'transparent')};
  box-shadow: ${({ $selected }) => ($selected ? 'none' : 'inset 0 0 0 0.0625rem rgba(0, 0, 0, 0.1)')};
  border-radius: 62.4375rem;
  transition:
    background-color 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    background-color: #fff3e6;
    box-shadow: ${({ $selected }) => ($selected ? 'none' : 'inset 0 0 0 0.0625rem rgba(0, 0, 0, 0.2)')};
  }
`;
