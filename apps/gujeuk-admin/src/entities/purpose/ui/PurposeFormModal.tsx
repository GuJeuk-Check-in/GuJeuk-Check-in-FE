import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import styled from '@emotion/styled';
import { ColorData } from '@center/tokens';
import { useDialogFocusTrap } from '@shared/hooks/useDialogFocusTrap';
import {
  CloseIcon,
  ReservationActiveIcon,
  ReservationDefaultIcon,
} from '@shared/assets';

export interface PurposeFormValues {
  purpose: string;
  reservationStatus: boolean;
}

type PurposeFormMode = 'create' | 'update';

const FORM_TEXT: Record<
  PurposeFormMode,
  { title: string; subtitle: string; submitLabel: string; pendingLabel: string }
> = {
  create: {
    title: '방문 목적 추가',
    subtitle: '새 방문 목적을 만들고 예약 가능 여부를 정해요.',
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
        aria-describedby={subtitleId}
        tabIndex={-1}
      >
        <Form onSubmit={handleSubmit}>
          <Header>
            <TitleGroup>
              <Title id={titleId}>{text.title}</Title>
              <Subtitle id={subtitleId}>{text.subtitle}</Subtitle>
            </TitleGroup>
            <CloseButton
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              aria-label="닫기"
            >
              <img src={CloseIcon} alt="" width={20} height={20} />
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

          <ReservationSetting $isActive={reservationStatus}>
            <SettingText>
              <SettingTitle id={switchLabelId}>
                <img
                  src={
                    reservationStatus
                      ? ReservationActiveIcon
                      : ReservationDefaultIcon
                  }
                  alt=""
                  width={18}
                  height={18}
                />
                예약 가능 시설
              </SettingTitle>
              <SettingDescription>
                켜면 키오스크에서 시간대별 예약을 받을 수 있어요
              </SettingDescription>
            </SettingText>
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
  filter: drop-shadow(0 1rem 1.25rem rgba(0, 0, 0, 0.2));
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
  color: ${ColorData.colors.labelNormal};
  font-size: 1.5rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  margin: 0;
  color: #70737c;
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
  border-radius: ${ColorData.radius.pill};
  background-color: ${ColorData.colors.fillNormal};
  cursor: pointer;

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
  color: #37383c;
  font-size: 0.875rem;
  font-weight: 500;
`;

const Required = styled.span`
  color: ${ColorData.colors.negative};
`;

const Input = styled.input`
  height: 3.25rem;
  padding: 0 ${ColorData.spacing[16]};
  box-sizing: border-box;
  border: 1px solid rgba(112, 115, 124, 0.22);
  border-radius: ${ColorData.spacing[12]};
  background-color: ${ColorData.colors.background};
  color: ${ColorData.colors.labelNormal};
  font-family: inherit;
  font-size: 1rem;
  outline: none;

  &::placeholder {
    color: #a2a5ad;
  }

  &:focus {
    border: 1.5px solid ${ColorData.colors.primary};
    padding: 0 calc(${ColorData.spacing[16]} - 0.5px);
  }
`;

const ReservationSetting = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${ColorData.spacing[16]};
  padding: 1.125rem;
  border: 1px solid
    ${({ $isActive }) =>
      $isActive ? 'rgba(0, 102, 255, 0.35)' : 'rgba(112, 115, 124, 0.12)'};
  border-radius: 0.875rem;
  background-color: ${({ $isActive }) =>
    $isActive ? 'rgba(0, 102, 255, 0.05)' : 'rgba(112, 115, 124, 0.05)'};
  transition:
    background-color ${ColorData.interaction.transitionNormal},
    border-color ${ColorData.interaction.transitionNormal};
`;

const SettingText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${ColorData.spacing[4]};
`;

const SettingTitle = styled.p`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin: 0;
  color: ${ColorData.colors.labelNormal};
  font-size: 1rem;
  font-weight: 700;
`;

const SettingDescription = styled.p`
  margin: 0;
  color: #70737c;
  font-size: 0.8125rem;
`;

const Switch = styled.button<{ $isOn: boolean }>`
  position: relative;
  flex-shrink: 0;
  width: 3.25rem;
  height: 1.875rem;
  padding: 0;
  border: none;
  border-radius: ${ColorData.radius.pill};
  background-color: ${({ $isOn }) =>
    $isOn ? ColorData.colors.primary : 'rgba(112, 115, 124, 0.22)'};
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
    outline: none;
    box-shadow: ${ColorData.shadow.focus};
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
  border: none;
  border-radius: ${ColorData.spacing[12]};
  background-color: ${({ $variant }) =>
    $variant === 'primary'
      ? ColorData.colors.primary
      : ColorData.colors.fillNormal};
  color: ${({ $variant }) =>
    $variant === 'primary'
      ? ColorData.colors.background
      : ColorData.colors.labelNeutral};
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color ${ColorData.interaction.transitionFast};

  &:hover:not(:disabled) {
    background-color: ${({ $variant }) =>
      $variant === 'primary'
        ? ColorData.colors.primaryStrong
        : 'rgba(112, 115, 124, 0.16)'};
  }

  &:disabled {
    background-color: ${ColorData.colors.interactionDisabled};
    color: ${ColorData.colors.labelDisabled};
    cursor: not-allowed;
  }
`;
