import { CalendarField, parseCalendarDate } from '@center/ui/form';
import { formatDateToKoreanDate } from './visitDateFormatters';

interface VisitDatePickerProps {
  readonly value: string | Date | null;
  readonly onChange: (date: string) => void;
  readonly label?: string;
}

export const VisitDatePicker = ({ value, onChange, label }: VisitDatePickerProps) => (
  <CalendarField
    legacy
    value={parseCalendarDate(value)}
    onChange={(date) => onChange(formatDateToKoreanDate(date))}
    label={label}
  />
);
