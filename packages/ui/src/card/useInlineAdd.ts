import { useState, type ChangeEvent, type KeyboardEvent } from 'react';

interface InlineAddOptions {
  readonly onSubmit: (value: string) => void;
  readonly disabled?: boolean;
}

export const useInlineAdd = ({ onSubmit, disabled = false }: InlineAddOptions) => {
  const [isAdding, setIsAdding] = useState(false);
  const [draft, setDraft] = useState('');

  const start = () => {
    if (!disabled) setIsAdding(true);
  };

  const cancel = () => {
    if (disabled) return;
    setDraft('');
    setIsAdding(false);
  };

  const submit = () => {
    if (!disabled) onSubmit(draft.trim());
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === 'Enter') {
      event.preventDefault();
      submit();
    }
    if (event.key === 'Escape') cancel();
  };

  return {
    isAdding, start, cancel, submit,
    inputProps: {
      value: draft,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setDraft(event.target.value),
      onKeyDown: handleKeyDown,
      disabled,
      autoFocus: true,
    },
  };
};
