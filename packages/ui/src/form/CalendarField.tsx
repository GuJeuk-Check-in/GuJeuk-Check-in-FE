import { useId, useRef, useState, type ReactNode } from 'react';
import { FaCalendarDays } from 'react-icons/fa6';
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward, IoIosArrowUp } from 'react-icons/io';
import { DropdownContainer, DropdownLabel, DropdownArrowIcon } from './DropdownParts';
import { CalendarTrigger, CalendarValue, CalendarWrapper, StyledCalendar } from './CalendarParts';
import { formatCalendarDate } from './dateFormatters';
import 'react-calendar/dist/Calendar.css';

interface CalendarFieldProps {
  readonly value: Date | null;
  readonly onChange: (value: Date) => void;
  readonly label?: string;
  readonly legacy?: boolean;
  readonly icon?: ReactNode;
  readonly variant?: 'default' | 'wide';
  readonly formatValue?: (date: Date) => string;
}

export const CalendarField = ({ value, onChange, label = '방문 날짜', legacy = false, icon, variant = 'default', formatValue = formatCalendarDate }: CalendarFieldProps) => {
  const wide = variant === 'wide';
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
        {icon ?? <FaCalendarDays size={24} aria-hidden="true" />}
        <CalendarValue id={`${id}-value`} $placeholder={!value} $legacy={legacy}>
          {value ? formatValue(value) : `${label}를 선택해주세요${legacy ? '.' : ''}`}
        </CalendarValue>
        {!wide && (
          <DropdownArrowIcon aria-hidden="true">
            {open ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
          </DropdownArrowIcon>
        )}
      </CalendarTrigger>
      {open && (
        <CalendarWrapper $legacy={legacy} $wide={wide} id={`${id}-calendar`} role="group" aria-labelledby={`${id}-label`}>
          <StyledCalendar
            $legacy={legacy} $wide={wide} value={value ?? (legacy ? new Date() : null)} onChange={handleDateSelect}
            calendarType="gregory" locale="ko-KR"
            nextLabel={wide ? <IoIosArrowForward aria-hidden="true" /> : '›'}
            prevLabel={wide ? <IoIosArrowBack aria-hidden="true" /> : '‹'}
            next2Label={wide ? null : undefined} prev2Label={wide ? null : undefined}
            formatDay={wide ? (_locale, date) => String(date.getDate()) : undefined}
            navigationAriaLabel="달력 탐색" prevAriaLabel="이전 기간" nextAriaLabel="다음 기간"
            prev2AriaLabel="이전 연도" next2AriaLabel="다음 연도"
          />
        </CalendarWrapper>
      )}
    </DropdownContainer>
  );
};
