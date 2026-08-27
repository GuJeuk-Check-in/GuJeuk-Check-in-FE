import type { ChangeEventHandler, ReactNode } from 'react';
import { FieldBlock, FieldLabel, TextInput } from './shared';

type TextFieldSectionProps = {
  readonly icon: ReactNode;
  readonly label: string;
  readonly value: string;
  readonly onChange: ChangeEventHandler<HTMLInputElement>;
  readonly placeholder: string;
};

export const TextFieldSection = ({
  icon,
  label,
  value,
  onChange,
  placeholder,
}: TextFieldSectionProps) => (
  <FieldBlock>
    <FieldLabel>
      {icon}
      {label}
    </FieldLabel>
    <TextInput value={value} onChange={onChange} placeholder={placeholder} />
  </FieldBlock>
);
