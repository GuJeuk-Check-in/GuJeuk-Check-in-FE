import { useEffect, useId, useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react';
import { adminTokens } from '@center/tokens';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MdOutlineAccessTime } from 'react-icons/md';
import { DropdownContainer, DropdownLabel, dropdownSlideDown } from './DropdownParts';

interface TimePickerFieldProps {
  readonly label: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly open?: boolean;
  readonly onOpenChange?: (open: boolean) => void;
  readonly panelTitle?: string;
}

type Period = '오전' | '오후';

const ROW_HEIGHT = 32;
const CURRENT_HEIGHT = 40;

const pad = (value: number) => String(value).padStart(2, '0');

const parseTime = (value: string) => {
  const [hour = '0', minute = '0'] = value.split(':');
  return { hour: Number(hour) % 24 || 0, minute: Number(minute) % 60 || 0 };
};

const toHour12 = (hour: number) => hour % 12 || 12;

export const TimePickerField = ({
  label,
  value,
  onChange,
  open: controlledOpen,
  onOpenChange,
  panelTitle = '방문시간',
}: TimePickerFieldProps) => {
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const [innerOpen, setInnerOpen] = useState(false);
  const [draft, setDraft] = useState(() => parseTime(value));
  const open = controlledOpen ?? innerOpen;

  const setOpen = (next: boolean) => {
    if (next) setDraft(parseTime(value));
    setInnerOpen(next);
    onOpenChange?.(next);
  };

  const period: Period = draft.hour >= 12 ? '오후' : '오전';
  const hour12 = toHour12(draft.hour);

  const changePeriod = (next: Period) =>
    setDraft(({ hour, minute }) => ({ hour: (hour % 12) + (next === '오후' ? 12 : 0), minute }));

  const stepPeriod = (delta: number) => changePeriod(delta < 0 ? '오전' : '오후');

  const stepHour = (delta: number) =>
    setDraft(({ hour, minute }) => {
      const next = ((toHour12(hour) - 1 + delta + 12) % 12) + 1;
      return { hour: (next % 12) + (hour >= 12 ? 12 : 0), minute };
    });

  const stepMinute = (delta: number) =>
    setDraft(({ hour, minute }) => ({ hour, minute: (minute + delta + 60) % 60 }));

  const typeHour = (digits: string) => {
    const typed = Math.min(Number(digits), 23);
    setDraft(({ hour, minute }) => {
      if (typed >= 12) return { hour: typed, minute };
      if (typed === 0) return { hour: 0, minute };
      return { hour: typed + (hour >= 12 ? 12 : 0), minute };
    });
  };
  
  const typeMinute = (digits: string) =>
    setDraft(({ hour }) => ({ hour, minute: Math.min(Number(digits), 59) }));

  const handleConfirm = () => {
    onChange(`${pad(draft.hour)}:${pad(draft.minute)}`);
    setOpen(false);
    trigger.current?.focus();
  };

  return (
    <DropdownContainer
      onBlur={(event) => {
        if (open && !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <DropdownLabel id={`${id}-label`} htmlFor={id}>{label}</DropdownLabel>
      <Trigger
        type="button"
        id={id}
        ref={trigger}
        aria-labelledby={`${id}-label ${id}-value`}
        aria-expanded={open}
        aria-controls={open ? `${id}-panel` : undefined}
        onClick={() => setOpen(!open)}
      >
        <MdOutlineAccessTime size={24} aria-hidden="true" />
        <Value id={`${id}-value`}>{value}</Value>
        {open ? <IoIosArrowUp size={20} aria-hidden="true" /> : <IoIosArrowDown size={20} aria-hidden="true" />}
      </Trigger>
      {open && (
        <Panel id={`${id}-panel`} role="group" aria-label={panelTitle}>
          <PanelTitle>{panelTitle}</PanelTitle>
          <Columns>
            <Spinner
              label="오전 오후"
              showLabel={false}
              variant="period"
              prev={period === '오후' ? '오전' : null}
              current={period}
              next={period === '오전' ? '오후' : null}
              valueNow={period === '오후' ? 1 : 0}
              min={0}
              max={1}
              valueText={period}
              onStep={stepPeriod}
            />
            <Spinner
              label="시"
              prev={String(((hour12 + 10) % 12) + 1)}
              current={String(hour12)}
              next={String((hour12 % 12) + 1)}
              valueNow={hour12}
              min={1}
              max={12}
              valueText={`${hour12}시`}
              onStep={stepHour}
              onType={typeHour}
              onEnter={handleConfirm}
            />
            <Spinner
              label="분"
              prev={pad((draft.minute + 59) % 60)}
              current={pad(draft.minute)}
              next={pad((draft.minute + 1) % 60)}
              valueNow={draft.minute}
              min={0}
              max={59}
              valueText={`${draft.minute}분`}
              onStep={stepMinute}
              onType={typeMinute}
              onEnter={handleConfirm}
            />
          </Columns>
          <ConfirmButton type="button" onClick={handleConfirm}>설정하기</ConfirmButton>
        </Panel>
      )}
    </DropdownContainer>
  );
};

interface SpinnerProps {
  readonly label: string;
  readonly showLabel?: boolean;
  readonly variant?: 'number' | 'period';
  readonly prev: string | null;
  readonly current: string;
  readonly next: string | null;
  readonly valueNow: number;
  readonly min: number;
  readonly max: number;
  readonly valueText: string;
  readonly onStep: (delta: 1 | -1) => void;
  readonly onType?: (digits: string) => void;
  readonly onEnter?: () => void;
}

const WHEEL_STEP_DISTANCE = 40;

const Spinner = ({
  label,
  showLabel = true,
  variant = 'number',
  prev,
  current,
  next,
  valueNow,
  min,
  max,
  valueText,
  onStep,
  onType,
  onEnter,
}: SpinnerProps) => {
  const column = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [typed, setTyped] = useState<string | null>(null);

  const step = (delta: 1 | -1) => {
    setDirection(delta);
    onStep(delta);
  };
  const stepForWheel = useRef(step);
  stepForWheel.current = step;

  useEffect(() => {
    const element = column.current;
    if (!element) return undefined;
    let distance = 0;
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      distance += event.deltaY;
      if (Math.abs(distance) >= WHEEL_STEP_DISTANCE) {
        stepForWheel.current(distance > 0 ? 1 : -1);
        distance = 0;
      }
    };
    element.addEventListener('wheel', handleWheel, { passive: false });
    return () => element.removeEventListener('wheel', handleWheel);
  }, []);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      step(-1);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      step(1);
    }
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, '').slice(-2);
    setTyped(digits.length >= 2 ? null : digits);
    if (digits) onType?.(digits);
  };

  const handleInputKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onEnter?.();
      return;
    }
    handleKeyDown(event);
  };

  const isPeriod = variant === 'period';

  return (
    <Column ref={column} $period={isPeriod}>
      <ColumnLabel aria-hidden={!showLabel}>{showLabel ? label : ''}</ColumnLabel>
      {prev === null ? (
        <Placeholder aria-hidden="true" />
      ) : (
        <NeighborButton
          type="button"
          $period={isPeriod}
          aria-label={`${label} 이전 값 ${prev}`}
          onClick={() => step(-1)}
        >
          <Roll key={prev} $direction={direction}>{prev}</Roll>
        </NeighborButton>
      )}
      {onType ? (
        <Current $period={false}>
          <Roll key={current} data-roll $direction={direction} aria-hidden="true">{current}</Roll>
          <CurrentInput
            type="text"
            inputMode="numeric"
            autoComplete="off"
            role="spinbutton"
            aria-label={label}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={valueNow}
            aria-valuetext={valueText}
            value={typed ?? current}
            onChange={handleInput}
            onFocus={(event) => event.target.select()}
            onBlur={() => setTyped(null)}
            onKeyDown={handleInputKeyDown}
          />
        </Current>
      ) : (
        <Current
          $period={isPeriod}
          role="spinbutton"
          tabIndex={0}
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={valueNow}
          aria-valuetext={valueText}
          onKeyDown={handleKeyDown}
        >
          <Roll key={current} $direction={direction}>{current}</Roll>
        </Current>
      )}
      {next === null ? (
        <Placeholder aria-hidden="true" />
      ) : (
        <NeighborButton
          type="button"
          $period={isPeriod}
          aria-label={`${label} 다음 값 ${next}`}
          onClick={() => step(1)}
        >
          <Roll key={next} $direction={direction}>{next}</Roll>
        </NeighborButton>
      )}
    </Column>
  );
};

const roll = (direction: 1 | -1) => keyframes`
  from {
    opacity: 0.2;
    transform: translateY(${direction * 14}px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Trigger = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: ${({ theme }) => adminTokens(theme).components.fieldHeight};
  padding: 0 16px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => adminTokens(theme).colors.fieldBorder};
  border-radius: ${({ theme }) => adminTokens(theme).components.fieldRadius};
  background-color: ${({ theme }) => adminTokens(theme).colors.white};
  color: ${({ theme }) => adminTokens(theme).colors.text};
  font: inherit;
  font-size: ${({ theme }) => adminTokens(theme).typography.input};
  cursor: pointer;

  &:focus,
  &[aria-expanded='true'] {
    outline: none;
    border-color: ${({ theme }) => adminTokens(theme).colors.primary};
    background-color: #fbfbff;
  }
`;

const Value = styled.span`
  flex: 1;
  text-align: left;
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
  margin-top: 16px;
  padding: 32px 24px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => adminTokens(theme).colors.fieldBorder};
  border-radius: 16px;
  background-color: ${({ theme }) => adminTokens(theme).colors.white};
  animation: ${dropdownSlideDown} 0.2s ease-out;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const PanelTitle = styled.p`
  margin: 0;
  color: ${({ theme }) => adminTokens(theme).colors.black};
  font-size: 20px;
  font-weight: 700;
`;

const Columns = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 32px;
`;

const Column = styled.div<{ $period: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: ${({ $period }) => ($period ? 48 : 76)}px;
`;

const Placeholder = styled.div`
  height: ${ROW_HEIGHT}px;
`;

const ColumnLabel = styled.span`
  height: 32px;
  margin-bottom: 8px;
  color: ${({ theme }) => adminTokens(theme).colors.black};
  font-size: 20px;
  line-height: 32px;
`;

const Roll = styled.span<{ $direction: 1 | -1 }>`
  display: inline-block;
  animation: ${({ $direction }) => roll($direction)} 0.18s ease-out;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const NeighborButton = styled.button<{ $period: boolean }>`
  height: ${ROW_HEIGHT}px;
  border: none;
  background: none;
  padding: 0 8px;
  color: ${({ theme }) => adminTokens(theme).colors.secondaryText};
  font: inherit;
  font-size: ${({ $period }) => ($period ? 20 : 18)}px;
  font-weight: ${({ $period }) => ($period ? 400 : 700)};
  cursor: pointer;
  &:focus-visible {
    outline: 2px solid ${({ theme }) => adminTokens(theme).colors.primaryDark};
    outline-offset: 2px;
  }
`;

const Current = styled.div<{ $period: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $period }) => ($period ? 48 : 76)}px;
  height: ${CURRENT_HEIGHT}px;
  box-sizing: border-box;
  border-top: 1px solid ${({ theme, $period }) => $period ? 'transparent' : adminTokens(theme).colors.text};
  border-bottom: 1px solid ${({ theme, $period }) => $period ? 'transparent' : adminTokens(theme).colors.text};
  color: ${({ theme, $period }) => $period ? adminTokens(theme).colors.black : adminTokens(theme).colors.text};
  font-size: ${({ $period }) => ($period ? 20 : 24)}px;
  &:focus-visible {
    outline: 2px solid ${({ theme }) => adminTokens(theme).colors.primaryDark};
    outline-offset: 2px;
  }

  &:focus-within [data-roll] {
    visibility: hidden;
  }
`;

const CurrentInput = styled.input`
  position: absolute;
  inset: 0;
  width: 100%;
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => adminTokens(theme).colors.text};
  font: inherit;
  font-size: 24px;
  text-align: center;
  opacity: 0;

  &:focus {
    opacity: 1;
  }
`;

const ConfirmButton = styled.button`
  width: 176px;
  height: 48px;
  border: 1px solid ${({ theme }) => adminTokens(theme).colors.primary};
  border-radius: 20px;
  background-color: ${({ theme }) => adminTokens(theme).colors.white};
  color: ${({ theme }) => adminTokens(theme).colors.primary};
  font: inherit;
  font-size: 20px;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => adminTokens(theme).colors.primaryDark};
    outline-offset: 2px;
  }
`;
