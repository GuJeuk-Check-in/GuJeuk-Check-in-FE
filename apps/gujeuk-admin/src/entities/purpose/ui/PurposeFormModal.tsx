import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import styled from '@emotion/styled';
import { ColorData } from '@center/tokens';
import { LuCalendarCheck } from 'react-icons/lu';
import { MdClose } from 'react-icons/md';
import { useDialogFocusTrap } from '@shared/hooks/useDialogFocusTrap';
import { PurposeColors } from './purposeColors';

export interface PurposeFormValues {
  purpose: string;
  reservationStatus: boolean;
}

type PurposeFormMode = 'create' | 'update';

const FORM_TEXT: Record<
  PurposeFormMode,
  {
    title: string;
    subtitle: string | null;
    submitLabel: string;
    pendingLabel: string;
  }
> = {
  create: {
    title: '방문 목적 추가',
    subtitle: null,
    submitLabel: '추가하기',
    pendingLabel: '추가 중...',
  },
  update: {
    title: '방문 목적 수정',
    subtitle: '이름과 예약 가능 여부를 바꿀 수 있어요.',
    submitLabel: '저장하기',
    pendingLabel: '저장 중...',
  },
};

const EMPTY_VALUES: PurposeFormValues = {
  purpose: '',
  reservationStatus: false,
};

interface PurposeFormModalProps {
  mode: PurposeFormMode;
  initialValues?: PurposeFormValues;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (values: PurposeFormValues) => void;
}

export const PurposeFormModal = ({
  mode,
  initialValues = EMPTY_VALUES,
  isSubmitting,
  onClose,
  onSubmit,
}: PurposeFormModalProps) => {
  const [purpose, setPurpose] = useState(initialValues.purpose);
  const [reservationStatus, setReservationStatus] = useState(
    initialValues.reservationStatus
  );
  const dialogRef = useDialogFocusTrap(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const subtitleId = useId();
  const inputId = useId();
  const switchLabelId = useId();
  const text = FORM_TEXT[mode];
  const trimmedPurpose = purpose.trim();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSubmitting) onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSubmitting, onClose]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting || !trimmedPurpose) return;

    onSubmit({ purpose: trimmedPurpose, reservationStatus });
  };

  return (
    <Overlay
      onClick={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) onClose();
      }}
    >
      <Dialog
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={text.subtitle ? subtitleId : undefined}
        tabIndex={-1}
      >
        <Form onSubmit={handleSubmit}>
          <Header>
            <TitleGroup>
              <Title id={titleId}>{text.title}</Title>
              {text.subtitle && (
                <Subtitle id={subtitleId}>{text.subtitle}</Subtitle>
              )}
            </TitleGroup>
            <CloseButton
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              aria-label="닫기"
            >
              <MdClose aria-hidden="true" />
            </CloseButton>
          </Header>

          <Field>
            <Label htmlFor={inputId}>
              방문 목적 이름<Required aria-hidden="true">*</Required>
            </Label>
            <Input
              ref={inputRef}
              id={inputId}
              value={purpose}
              onChange={(event) => setPurpose(event.target.value)}
              placeholder="예: 노래방, PC, 독서"
              maxLength={30}
              required
              disabled={isSubmitting}
            />
          </Field>

          <ReservationSetting>
            <SettingTitle id={switchLabelId}>
              <LuCalendarCheck aria-hidden="true" />
              예약 가능 시설
            </SettingTitle>
            <Switch
              type="button"
              role="switch"
              aria-checked={reservationStatus}
              aria-labelledby={switchLabelId}
              $isOn={reservationStatus}
              onClick={() => setReservationStatus((current) => !current)}
              disabled={isSubmitting}
            />
          </ReservationSetting>

          <Actions>
            <ActionButton
              type="button"
              $variant="secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              취소
            </ActionButton>
            <ActionButton
              type="submit"
              $variant="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? text.pendingLabel : text.submitLabel}
            </ActionButton>
          </Actions>
        </Form>
      </Dialog>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Dialog = styled.div`
  width: min(calc(100% - 2rem), 30rem);
  max-height: calc(100dvh - 2rem);
  box-sizing: border-box;
  overflow-y: auto;
  padding: ${ColorData.spacing[32]} ${ColorData.spacing[32]} 1.75rem;
  border-radius: 1.25rem;
  background-color: ${ColorData.colors.background};
  box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.2);
  font-family: ${ColorData.typography.fontFamily};
  text-align: left;
  outline: none;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${ColorData.spacing[24]};
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${ColorData.spacing[16]};
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

const Title = styled.h2`
  margin: 0;
  color: ${PurposeColors.gray40};
  font-family: inherit;
  font-size: 1.5rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  margin: 0;
  color: ${PurposeColors.gray10};
  font-family: inherit;
  font-size: 0.9375rem;
`;

const CloseButton = styled.button`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: none;
  border-radius: 999px;
  background-color: ${ColorData.colors.background};
  color: ${PurposeColors.gray30};
  cursor: pointer;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  &:hover:not(:disabled) {
    background-color: ${ColorData.colors.fillNormal};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${ColorData.spacing[8]};
`;

const Label = styled.label`
  display: flex;
  gap: 0.125rem;
  color: ${PurposeColors.gray40};
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 500;
`;

const Required = styled.span`
  color: ${PurposeColors.error};
`;

const Input = styled.input`
  height: 3.25rem;
  padding: 0 1rem;
  box-sizing: border-box;
  border: 1px solid ${PurposeColors.gray30};
  border-radius: 0.75rem;
  background-color: ${ColorData.colors.background};
  color: ${PurposeColors.gray40};
  font-family: inherit;
  font-size: 1rem;
  outline: none;

  &::placeholder {
    color: ${PurposeColors.gray10};
  }
`;

const ReservationSetting = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.125rem;
  border: 1px solid ${PurposeColors.gray30};
  border-radius: 0.875rem;
  background-color: ${ColorData.colors.background};
`;

const SettingTitle = styled.p`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin: 0;
  color: ${PurposeColors.gray40};
  font-family: inherit;
  font-size: 1rem;
  font-weight: 700;

  svg {
    flex-shrink: 0;
    width: 1.125rem;
    height: 1.125rem;
    color: ${PurposeColors.gray30};
  }
`;

const Switch = styled.button<{ $isOn: boolean }>`
  position: relative;
  flex-shrink: 0;
  width: 3.25rem;
  height: 1.875rem;
  padding: 0;
  border: none;
  border-radius: 999px;
  background-color: ${({ $isOn }) =>
    $isOn ? PurposeColors.blue : PurposeColors.gray10};
  cursor: pointer;
  transition: background-color ${ColorData.interaction.transitionNormal};

  &::after {
    content: '';
    position: absolute;
    top: 0.1875rem;
    left: ${({ $isOn }) => ($isOn ? '1.5625rem' : '0.1875rem')};
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background-color: ${ColorData.colors.background};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.18);
    transition: left ${ColorData.interaction.transitionNormal};
  }

  &:focus-visible {
    outline: 2px solid ${PurposeColors.skyblue};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${ColorData.spacing[8]};
`;

const ActionButton = styled.button<{ $variant: 'primary' | 'secondary' }>`
  height: 3.25rem;
  border: 1px solid
    ${({ $variant }) =>
      $variant === 'primary' ? PurposeColors.blue : PurposeColors.gray30};
  border-radius: 0.75rem;
  background-color: ${({ $variant }) =>
    $variant === 'primary' ? PurposeColors.blue : ColorData.colors.background};
  color: ${({ $variant }) =>
    $variant === 'primary' ? ColorData.colors.background : PurposeColors.gray40};
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: filter ${ColorData.interaction.transitionFast};

  &:hover:not(:disabled) {
    filter: brightness(0.94);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
