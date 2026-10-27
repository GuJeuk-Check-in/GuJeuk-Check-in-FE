import type { ReactNode } from 'react';
import { CalendarField } from './CalendarField';
import { formatDateToISOString, parseCalendarDate } from './dateFormatters';

interface VisitDatePickerProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly label?: string;
  readonly icon?: ReactNode;
  readonly variant?: 'default' | 'wide';
  readonly formatValue?: (date: Date) => string;
  readonly highlightOnFocus?: boolean;
}

export const VisitDatePicker = ({ value, onChange, label, icon, variant, formatValue, highlightOnFocus }: VisitDatePickerProps) => (
  <CalendarField
    value={parseCalendarDate(value)}
    onChange={(date) => onChange(formatDateToISOString(date))}
    label={label}
    icon={icon}
    variant={variant}
    formatValue={formatValue}
    highlightOnFocus={highlightOnFocus}
  />
);
