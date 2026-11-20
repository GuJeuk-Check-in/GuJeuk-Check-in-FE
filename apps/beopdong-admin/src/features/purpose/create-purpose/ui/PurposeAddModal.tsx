import { useEffect, useId, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { adminTokens } from '@center/tokens';
import { FormModal } from '@shared/ui/FormModal';

interface PurposeAddModalProps {
  readonly onClose: () => void;
  readonly onSubmit: (label: string) => void;
}

export const PurposeAddModal = ({ onClose, onSubmit }: PurposeAddModalProps) => {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [label, setLabel] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    inputRef.current?.closest<HTMLElement>('[role="dialog"]')?.focus();
  }, []);

  const handleSubmit = () => {
    const trimmed = label.trim();
    if (!trimmed) {
      setErrorMessage('이용대장 이름을 입력해주세요.');
      return;
    }
    onSubmit(trimmed);
  };

  return (
    <FormModal title="이용대장 추가" subtitle="추가할 이용대장을 입력해주세요" onConfirm={handleSubmit} onClose={onClose}>
      <Field>
        <Label htmlFor={inputId}>이용대장 이름</Label>
        <Input
          ref={inputRef}
          id={inputId}
          type="text"
          placeholder="이름을 입력해주세요"
          value={label}
          aria-invalid={errorMessage ? true : undefined}
          onChange={(event) => {
            setLabel(event.target.value);
            setErrorMessage('');
          }}
          onKeyDown={(event) => {
            if (event.nativeEvent.isComposing || event.key !== 'Enter') return;
            event.preventDefault();
            handleSubmit();
          }}
        />
        {errorMessage && <ErrorText role="alert">{errorMessage}</ErrorText>}
      </Field>
    </FormModal>
  );
};

const Field = styled.div`
  margin-bottom: 2.5rem;
  padding: 0 0.6rem;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin: 0 0 0.8rem 0.1rem;
  color: #3a3a3a;
  font-size: 0.875rem;
  font-weight: 700;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  height: 2.7rem;
  padding: 0 1.6rem;
  box-sizing: border-box;
  border: 0;
  border-radius: 62.4375rem;
  background-color: #faf9ff;
  box-shadow: 0 0.45rem 0 #fde8cc;
  color: #3a3a3a;
  font-size: 0.8rem;
  font-weight: 600;

  &::placeholder {
    color: #707070;
    font-weight: 600;
  }

  &:focus-visible {
    outline: none;
    box-shadow:
      inset 0 0 0 0.125rem ${({ theme }) => adminTokens(theme).colors.primary},
      0 0.45rem 0 #fde8cc;
  }
`;

const ErrorText = styled.p`
  margin: 0.9rem 0 0 0.1rem;
  color: ${({ theme }) => adminTokens(theme).colors.error};
  font-size: 0.8125rem;
`;
