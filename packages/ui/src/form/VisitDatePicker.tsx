import { useId, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import styled from '@emotion/styled';
import { adminTokens } from '@center/tokens';
import { FaCalendarDays } from 'react-icons/fa6';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { DropdownContainer, DropdownLabel, DropdownHeader, DropdownValue, DropdownArrowIcon, dropdownSlideDown } from './DropdownParts';
import 'react-calendar/dist/Calendar.css';

interface VisitDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export const VisitDatePicker = ({ value, onChange, label = '방문 날짜' }: VisitDatePickerProps) => {
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [year, month, day] = value.split('-').map(Number);
  const date = value ? new Date(year, month - 1, day) : null;
  const selectedDate = date && !Number.isNaN(date.getTime()) ? date : null;

  const handleDateSelect = (date: Date | null | [Date | null, Date | null]) => {
    if (!(date instanceof Date)) return;
    onChange(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`);
    setOpen(false);
    trigger.current?.focus();
  };

  return (
    <DropdownContainer
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <DropdownLabel id={`${id}-label`} htmlFor={id}>{label}</DropdownLabel>
      <Trigger
        type="button" id={id} ref={trigger}
        aria-labelledby={`${id}-label ${id}-value`}
        aria-expanded={open} aria-controls={open ? `${id}-calendar` : undefined}
        onClick={() => setOpen((value) => !value)}
      >
        <FaCalendarDays size={24} aria-hidden="true" />
        <DropdownValue id={`${id}-value`}>
          {selectedDate ? `${year}년 ${month}월 ${day}일` : `${label}를 선택해주세요`}
        </DropdownValue>
        <DropdownArrowIcon aria-hidden="true">
          {open ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
        </DropdownArrowIcon>
      </Trigger>
      {open && (
        <CalendarWrapper id={`${id}-calendar`} role="group" aria-labelledby={`${id}-label`}>
          <StyledCalendar
            value={selectedDate} onChange={handleDateSelect}
            calendarType="gregory" locale="ko-KR" nextLabel="›" prevLabel="‹"
            navigationAriaLabel="달력 탐색" prevAriaLabel="이전 기간" nextAriaLabel="다음 기간"
            prev2AriaLabel="이전 연도" next2AriaLabel="다음 연도"
          />
        </CalendarWrapper>
      )}
    </DropdownContainer>
  );
};

const Trigger = styled(DropdownHeader.withComponent('button'))`
  gap: 0.75rem;
  min-height: calc(${({ theme }) => adminTokens(theme).components.fieldHeight} + 0.125rem);
  height: auto;
  padding-block: 0.75rem;
  font-family: inherit;
  text-align: left;

  > svg, > div { flex-shrink: 0; }
  > span { flex: 1; overflow-wrap: anywhere; min-width: 0; }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => adminTokens(theme).colors.primary};
    outline-offset: 2px;
  }
`;

const CalendarWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  width: 100%;
  box-sizing: border-box;
  padding: 1.25rem;
  background: ${({ theme }) => adminTokens(theme).colors.white};
  border: 0.0625rem solid #dcdcdc;
  border-radius: 0.75rem;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
  z-index: 10;
  animation: ${dropdownSlideDown} 0.2s ease-out forwards;

  @media (max-width: 32rem) { padding: 0.5rem; }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const StyledCalendar = styled(Calendar)`
  && {
    border: none;
    width: 100%;
    color: ${({ theme }) => adminTokens(theme).colors.black};
    background: ${({ theme }) => adminTokens(theme).colors.white};
  }

  .react-calendar__navigation {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  .react-calendar__navigation button {
    color: ${({ theme }) => adminTokens(theme).colors.black};
    font-size: 1.125rem;
    min-width: 2.75rem;
    background: none;
    border: none;
    cursor: pointer;
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    font-weight: 500;
    margin-bottom: 0.375rem;
  }
  .react-calendar__tile {
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: ${({ theme }) => adminTokens(theme).components.fieldRadius};
    font-size: 1.125rem;
    padding: 0;
    white-space: nowrap;
    background: none;
    border: none;
    margin-bottom: 0.25rem;
    cursor: pointer;
  }
  .react-calendar__tile--now,
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background: ${({ theme }) => adminTokens(theme).colors.primaryLight};
  }
  .react-calendar__tile--hasActive,
  .react-calendar__tile--active,
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: ${({ theme }) => adminTokens(theme).colors.primary};
    color: ${({ theme }) => adminTokens(theme).colors.white};
  }
  .react-calendar__month-view__days__day--weekend { color: ${({ theme }) => adminTokens(theme).colors.warning}; }
  .react-calendar__month-view__days__day--neighboringMonth { color: ${({ theme }) => adminTokens(theme).colors.secondaryText}; }
  .react-calendar__tile--active.react-calendar__month-view__days__day--weekend,
  .react-calendar__tile--active.react-calendar__month-view__days__day--neighboringMonth { color: ${({ theme }) => adminTokens(theme).colors.white}; }
`;
