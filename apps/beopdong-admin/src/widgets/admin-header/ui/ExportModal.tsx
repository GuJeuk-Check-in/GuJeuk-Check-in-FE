import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import styled from '@emotion/styled';
import { adminTokens } from '@center/tokens';

const PERIOD_OPTIONS = ['일계', '월계', '상반기', '하반기'] as const;

interface ExportModalProps {
  readonly title: string;
  readonly onConfirm: (period: string) => void;
  readonly onClose: () => void;
}

export const ExportModal = ({ title, onConfirm, onClose }: ExportModalProps) => {
  const [period, setPeriod] = useState<string>(PERIOD_OPTIONS[0]);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const subtitleId = useId();

  useEffect(() => {
    const previousFocus = document.activeElement;
    contentRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
    return () => {
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus();
      }
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      onClose();
    }
    if (event.key !== 'Tab') return;
    const buttons = contentRef.current?.querySelectorAll<HTMLButtonElement>('button');
    const first = buttons?.[0];
    const last = buttons?.[buttons.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Content
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={subtitleId}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <PlusIcon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <path d="M12 7.5v9M7.5 12h9" />
        </PlusIcon>
        <Title id={titleId}>{title}</Title>
        <Subtitle id={subtitleId}>내려받을 날짜를 선택해주세요</Subtitle>
        <Periods role="radiogroup" aria-label="내려받을 기간">
          {PERIOD_OPTIONS.map((option) => (
            <PeriodButton
              key={option}
              type="button"
              role="radio"
              aria-checked={period === option}
              $selected={period === option}
              onClick={() => setPeriod(option)}
            >
              {option}
            </PeriodButton>
          ))}
        </Periods>
        <Actions>
          <CancelButton type="button" onClick={onClose}>아니요</CancelButton>
          <ConfirmButton type="button" onClick={() => onConfirm(period)}>예</ConfirmButton>
        </Actions>
      </Content>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  box-sizing: border-box;
  width: 90%;
  max-width: 36rem;
  max-height: calc(100dvh - 2rem);
  overflow-y: auto;
  padding: 2.5rem 2rem;
  text-align: center;
  background-color: ${({ theme }) => adminTokens(theme).colors.white};
  border: 0.0625rem solid #d1d5db;
  border-radius: 1.875rem;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.15);

  @media (max-width: 32rem) {
    width: calc(100% - 2rem);
    padding: 1.5rem 1rem;
  }
`;

const PlusIcon = styled.svg`
  width: 3rem;
  height: 3rem;
  color: ${({ theme }) => adminTokens(theme).colors.primary};
`;

const Title = styled.h2`
  margin: 1rem 0 0.5rem;
  font-size: 1.75rem;
  font-weight: 600;
  color: ${({ theme }) => adminTokens(theme).colors.primary};
`;

const Subtitle = styled.p`
  margin: 0 0 2rem;
  font-size: 1rem;
  color: #6b7280;
`;

const Periods = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
`;

const PeriodButton = styled.button<{ $selected: boolean }>`
  box-sizing: border-box;
  min-width: 6.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
  font-weight: 700;
  cursor: pointer;
  background-color: ${({ theme }) => adminTokens(theme).colors.white};
  color: ${({ $selected, theme }) => ($selected ? '#8a5a1f' : adminTokens(theme).colors.primary)};
  border: ${({ $selected, theme }) => $selected
    ? `0.25rem solid ${adminTokens(theme).colors.primary}`
    : '0.0625rem solid #e5e5e5'};
  border-radius: 62.4375rem;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const ActionButton = styled.button`
  min-width: 11rem;
  padding: 0.75rem 2rem;
  font-size: 1.375rem;
  font-weight: 600;
  border: none;
  border-radius: 62.4375rem;
  cursor: pointer;
`;

const CancelButton = styled(ActionButton)`
  background-color: #ededed;
  color: #6b6b6b;
`;

const ConfirmButton = styled(ActionButton)`
  min-width: 14rem;
  background-color: ${({ theme }) => adminTokens(theme).colors.primary};
  color: ${({ theme }) => adminTokens(theme).colors.white};
`;
