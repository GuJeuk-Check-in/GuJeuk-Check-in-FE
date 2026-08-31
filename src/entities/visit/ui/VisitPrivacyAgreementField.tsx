import styled from '@emotion/styled';
import type { ChangeEventHandler } from 'react';

interface VisitPrivacyAgreementFieldProps {
  readonly checked: boolean;
  readonly onChange?: ChangeEventHandler<HTMLInputElement>;
  readonly name?: string;
  readonly disabled?: boolean;
  readonly readOnly?: boolean;
  readonly label?: string;
  readonly hideLabel?: boolean;
  readonly text?: string;
  readonly id?: string;
}

export const VisitPrivacyAgreementField = ({
  checked,
  onChange,
  name,
  disabled,
  readOnly,
  label = '개인 정보 수집 동의',
  hideLabel = false,
  text,
  id = 'visit-privacy-agreement',
}: VisitPrivacyAgreementFieldProps) => {
  const consentText = text ?? (checked ? '동의함' : '동의하지 않음');

  return (
    <FieldGroup>
      {!hideLabel && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
      <PrivacyConsentWrapper>
        <Checkbox
          id={id}
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
        />
        <ConsentText>{consentText}</ConsentText>
      </PrivacyConsentWrapper>
    </FieldGroup>
  );
};

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FieldLabel = styled.label`
  font-size: 1.25rem;
  color: #2e2e32;
  font-weight: 500;
`;

const PrivacyConsentWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
`;

const Checkbox = styled.input`
  width: 1.25rem;
  height: 1.25rem;
  appearance: none;
  border: 0.125rem solid #d1d8e0;
  border-radius: 0.25rem;
  background-color: #f8f9fa;
  position: relative;
  cursor: pointer;

  &:checked {
    background-color: #3f73b3;
    border-color: #3f73b3;
  }

  &:checked::before {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    font-size: 1rem;
  }
`;

const ConsentText = styled.span`
  font-size: 1rem;
  color: #6e7680;
`;
