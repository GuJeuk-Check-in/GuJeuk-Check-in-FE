import { useId, useRef, useState } from 'react';
import { FaCalendarDays } from 'react-icons/fa6';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { DropdownContainer, DropdownLabel, DropdownArrowIcon } from './DropdownParts';
import { CalendarTrigger, CalendarValue, CalendarWrapper, StyledCalendar } from './CalendarParts';
import { formatCalendarDate } from './dateFormatters';
import 'react-calendar/dist/Calendar.css';

interface CalendarFieldProps {
  readonly value: Date | null;
  readonly onChange: (value: Date) => void;
  readonly label?: string;
  readonly legacy?: boolean;
}

export const CalendarField = ({ value, onChange, label = '방문 날짜', legacy = false }: CalendarFieldProps) => {
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const handleDateSelect = (date: Date | null | [Date | null, Date | null]) => {
    if (!(date instanceof Date)) return;
    onChange(date);
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
      <CalendarTrigger
        $legacy={legacy} type="button" id={id} ref={trigger}
        aria-labelledby={`${id}-label ${id}-value`}
        aria-expanded={open} aria-controls={open ? `${id}-calendar` : undefined}
        onClick={() => setOpen((previous) => !previous)}
      >
        <FaCalendarDays size={24} aria-hidden="true" />
        <CalendarValue id={`${id}-value`} $placeholder={!value} $legacy={legacy}>
          {value ? formatCalendarDate(value) : `${label}를 선택해주세요${legacy ? '.' : ''}`}
        </CalendarValue>
        <DropdownArrowIcon aria-hidden="true">
          {open ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
        </DropdownArrowIcon>
      </CalendarTrigger>
      {open && (
        <CalendarWrapper $legacy={legacy} id={`${id}-calendar`} role="group" aria-labelledby={`${id}-label`}>
          <StyledCalendar
            $legacy={legacy} value={value ?? (legacy ? new Date() : null)} onChange={handleDateSelect}
            calendarType="gregory" locale="ko-KR" nextLabel="›" prevLabel="‹"
            navigationAriaLabel="달력 탐색" prevAriaLabel="이전 기간" nextAriaLabel="다음 기간"
            prev2AriaLabel="이전 연도" next2AriaLabel="다음 연도"
          />
        </CalendarWrapper>
      )}
    </DropdownContainer>
  );
};
