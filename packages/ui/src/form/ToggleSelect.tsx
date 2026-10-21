import type { ReactNode } from 'react';
import { SelectOption } from './SelectOption';

interface ToggleSelectProps {
  readonly label: string;
  readonly options: readonly string[];
  readonly value: string;
  readonly onChange: (option: string) => void;
  readonly icon?: ReactNode;
  readonly placeholder?: string;
  readonly disable?: boolean;
}

export const ToggleSelect = ({ label, options, value, onChange, placeholder, disable }: ToggleSelectProps) => (
  <SelectOption label={label} options={options} value={value} onChange={onChange} placeholder={placeholder} disabled={disable} legacy />
);
