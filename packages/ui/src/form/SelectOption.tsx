import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import styled from '@emotion/styled';
import { adminTokens } from '@center/tokens';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import {
  DropdownContainer, DropdownLabel, DropdownHeader,
  DropdownValue, DropdownArrowIcon, DropdownList,
} from './DropdownParts';

type SelectOptionProps = {
  label: string;
  options: readonly string[];
  icon?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  legacy?: boolean;
  highlightOnFocus?: boolean;
} & ({
  multiple?: false;
  value: string;
  onChange: (value: string) => void;
} | {
  multiple: true;
  value: readonly string[];
  onChange: (value: string[]) => void;
});

export const SelectOption = (props: SelectOptionProps) => {
  const { label, options, icon, placeholder = `${label} 선택`, disabled = false, legacy = false, highlightOnFocus = false } = props;
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const selected = props.multiple ? props.value : [props.value];

  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  const handleSelect = (option: string) => {
    if (disabled) return;
    if (props.multiple) {
      props.onChange(selected.includes(option)
        ? selected.filter((value) => value !== option)
        : [...selected, option]);
    } else {
      props.onChange(option);
      setOpen(false);
      trigger.current?.focus();
    }
  };

  return (
    <Container
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
      {label && <DropdownLabel id={`${id}-label`} htmlFor={id}>{label}</DropdownLabel>}
      <Trigger
        $legacy={legacy} $highlightOnFocus={highlightOnFocus} disabled={disabled}
        type="button" id={id} ref={trigger}
        aria-labelledby={label ? `${id}-label ${id}-value` : `${id}-value`}
        aria-expanded={open} aria-controls={open ? `${id}-options` : undefined}
        onClick={() => setOpen((value) => !value)}
      >
        {icon && <Icon aria-hidden="true">{icon}</Icon>}
        <Value id={`${id}-value`}>{selected.filter(Boolean).join(' / ') || placeholder}</Value>
        <DropdownArrowIcon aria-hidden="true">
          {open ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
        </DropdownArrowIcon>
      </Trigger>
      {open && !disabled && (
        <Options $legacy={legacy} id={`${id}-options`} role="group" aria-labelledby={label ? `${id}-label` : `${id}-value`}>
          {options.map((option) => (
            <Option $legacy={legacy} key={option} type="button" aria-pressed={selected.includes(option)} onClick={() => handleSelect(option)}>
              <SelectionMark aria-hidden="true" $selected={selected.includes(option)} />
              {option}
            </Option>
          ))}
        </Options>
      )}
    </Container>
  );
};

const Container = styled(DropdownContainer)`
  width: 100%;
`;

const Trigger = styled(DropdownHeader.withComponent('button'))<{ $legacy: boolean; $highlightOnFocus: boolean }>`
  gap: 0.75rem;
  min-height: calc(${({ theme }) => adminTokens(theme).components.fieldHeight} + 0.125rem);
  height: auto;
  padding-block: 0.75rem;
  font-family: inherit;
  opacity: ${({ disabled }) => disabled ? 0.6 : 1};

  ${({ $legacy }) => $legacy && `
    box-sizing: content-box;
    width: calc(100% - 2rem);
    height: 2.5rem;
    min-height: 0;
    padding: 0.5rem 0.9375rem;
  `}

  ${({ $highlightOnFocus, theme }) => $highlightOnFocus ? `
    &:focus,
    &[aria-expanded='true'] {
      outline: none;
      border-color: ${adminTokens(theme).colors.primary};
      background-color: #fbfbff;
    }
  ` : `
    &:focus-visible {
      outline: 2px solid ${adminTokens(theme).colors.primary};
      outline-offset: 2px;
    }
  `}
`;

const Icon = styled.span`
  display: flex;
  flex-shrink: 0;
  font-size: 1.5rem;
`;

const Value = styled(DropdownValue)`
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
`;

const Options = styled(DropdownList)<{ $legacy: boolean }>`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
  top: 100%;
  margin-top: 0.5rem;
  max-height: none;
  overflow: visible;
  border: none;
  border-radius: 0;
  background: ${({ theme }) => adminTokens(theme).colors.white};
  box-shadow: none;
  ${({ $legacy }) => $legacy && `
    top: calc(3.5rem + 2.5rem);
    margin: 0;
    animation-fill-mode: none;
  `}
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Option = styled.button<{ $legacy: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  min-height: 3.875rem;
  padding: 0.625rem 0.9375rem;
  border: 0.0625rem solid ${({ theme }) => adminTokens(theme).colors.text};
  border-radius: ${({ theme }) => adminTokens(theme).components.fieldRadius};
  background: ${({ theme }) => adminTokens(theme).colors.white};
  color: ${({ theme }) => adminTokens(theme).colors.black};
  font: inherit;
  font-size: 1rem;
  overflow-wrap: anywhere;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &[aria-pressed='true'], &:hover, &:focus-visible {
    background: ${({ theme }) => adminTokens(theme).colors.selected};
  }

  &:hover {
    background: ${({ theme, $legacy }) => $legacy ? adminTokens(theme).colors.selectedHover : adminTokens(theme).colors.selected};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => adminTokens(theme).colors.primary};
    outline-offset: -2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const SelectionMark = styled.span<{ $selected: boolean }>`
  box-sizing: content-box;
  width: 1.125rem;
  height: 1.125rem;
  flex-shrink: 0;
  border-radius: 50%;
  border: 0.125rem solid ${({ theme }) => adminTokens(theme).colors.primary};
  background: ${({ $selected, theme }) => $selected ? adminTokens(theme).colors.primary : 'transparent'};
  box-shadow: ${({ $selected, theme }) => $selected ? `inset 0 0 0 0.1875rem ${adminTokens(theme).colors.white}` : 'none'};
  transition: background-color 0.2s ease, box-shadow 0.2s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
