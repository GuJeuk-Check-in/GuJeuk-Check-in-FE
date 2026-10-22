import { CalendarField } from './CalendarField';
import { formatDateToISOString, parseCalendarDate } from './dateFormatters';

interface VisitDatePickerProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly label?: string;
}

export const VisitDatePicker = ({ value, onChange, label }: VisitDatePickerProps) => (
  <CalendarField value={parseCalendarDate(value)} onChange={(date) => onChange(formatDateToISOString(date))} label={label} />
);
