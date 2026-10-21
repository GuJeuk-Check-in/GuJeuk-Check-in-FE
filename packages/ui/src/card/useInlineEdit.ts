import { useRef, useState, type ChangeEvent, type KeyboardEvent, type SyntheticEvent } from 'react';

interface InlineEditOptions {
  readonly value: string;
  readonly onSubmit: (value: string) => void;
  readonly disabled?: boolean;
}

export const stopTileDrag = (event: SyntheticEvent) => event.stopPropagation();

export const useInlineEdit = ({ value, onSubmit, disabled = false }: InlineEditOptions) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const finished = useRef(true);

  const start = () => {
    if (disabled) return;
    finished.current = false;
    setDraft(value);
    setIsEditing(true);
  };

  const cancel = () => {
    finished.current = true;
    setDraft(value);
    setIsEditing(false);
  };

  const submit = () => {
    if (disabled || finished.current) return;
    finished.current = true;
    setIsEditing(false);
    const trimmed = draft.trim();
    if (trimmed && trimmed !== value) onSubmit(trimmed);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (event.nativeEvent.isComposing) return;
    if (event.key === 'Enter') {
      event.preventDefault();
      submit();
    }
    if (event.key === 'Escape') cancel();
  };

  return {
    isEditing, start, cancel,
    inputProps: {
      value: draft,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setDraft(event.target.value),
      onBlur: submit,
      onKeyDown: handleKeyDown,
      onPointerDown: stopTileDrag,
      onMouseDown: stopTileDrag,
      onClick: stopTileDrag,
      disabled,
      autoFocus: true,
    },
  };
};
