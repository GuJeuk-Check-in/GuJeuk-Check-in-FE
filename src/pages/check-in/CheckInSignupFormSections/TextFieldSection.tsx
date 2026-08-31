import type { ChangeEventHandler, ReactNode } from 'react';
import { FieldBlock, FieldLabel, TextInput } from './shared';

type TextFieldSectionProps = {
  readonly icon: ReactNode;
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly onChange: ChangeEventHandler<HTMLInputElement>;
  readonly placeholder: string;
};

export const TextFieldSection = ({
  icon,
  id,
  label,
  value,
  onChange,
  placeholder,
}: TextFieldSectionProps) => (
  <FieldBlock>
    <TextInputLabel htmlFor={id}>
      {icon}
      {label}
    </TextInputLabel>
    <TextInput
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </FieldBlock>
);

const TextInputLabel = FieldLabel.withComponent('label');
