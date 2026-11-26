import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import styled from '@emotion/styled';
import { ColorData } from '@center/tokens';
import { LuCalendarCheck } from 'react-icons/lu';
import { MdAdd, MdClose, MdOutlineEdit } from 'react-icons/md';
import { useDialogFocusTrap } from '@shared/hooks/useDialogFocusTrap';
import { usePurposeStore } from '../model/purposeStore';
import type {
  CreatePurposeRequest,
  PurposeFormValues,
  SubPurpose,
} from '../model/types';
import { PurposeColors } from './purposeColors';

type PurposeFormMode = 'create' | 'update';

type SubPurposeDraft = Omit<SubPurpose, 'id'>;

const FORM_TEXT = {
  create: {
    title: '방문 목적 추가',
    submitLabel: '추가하기',
    pendingLabel: '추가 중...',
  },
  update: {
    title: '방문 목적 수정',
    submitLabel: '저장하기',
    pendingLabel: '저장 중...',
  },
} as const;

const EMPTY_VALUES: CreatePurposeRequest = {
  purpose: '',
  reservationStatus: false,
};

const EMPTY_SUB_PURPOSE: SubPurposeDraft = { name: '', reservable: false };

interface PurposeFormModalProps {
  mode: PurposeFormMode;
  initialValues?: CreatePurposeRequest & { id?: number };
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
    initialValues.reservationStatus,
  );
  const initialSubPurposes = usePurposeStore((state) =>
    initialValues.id === undefined
      ? undefined
      : state.subPurposesByPurposeId[initialValues.id],
  );
  const [subPurposes, setSubPurposes] = useState(
    () => initialSubPurposes ?? [],
  );
  const [newSubPurpose, setNewSubPurpose] = useState(EMPTY_SUB_PURPOSE);
  const [editing, setEditing] = useState<SubPurpose | null>(null);
  const nextSubPurposeId = useRef(
    subPurposes.reduce((max, item) => Math.max(max, item.id), -1) + 1,
  ); //아이디 중복 발급 방지
  const dialogRef = useDialogFocusTrap(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const subPurposeInputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const inputId = useId();
  const reservationSettingId = useId();
  const subPurposeInputId = useId();
  const editInputId = useId();
  const text = FORM_TEXT[mode];
  const trimmedPurpose = purpose.trim();
  const editingId = editing?.id;

  const addSubPurpose = () => {
    const name = newSubPurpose.name.trim();
    if (!name || isSubmitting) return;

    const item = { ...newSubPurpose, name, id: nextSubPurposeId.current++ };
    setSubPurposes((current) => [...current, item]);
    setNewSubPurpose(EMPTY_SUB_PURPOSE);
    subPurposeInputRef.current?.focus();
  };

  const saveSubPurpose = () => {
    if (!editing || isSubmitting) return;
    const name = editing.name.trim();
    if (!name) return;

    setSubPurposes((current) =>
      current.map((item) =>
        item.id === editing.id ? { ...editing, name } : item,
      ),
    );
    setEditing(null);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (editingId !== undefined) editInputRef.current?.focus();
  }, [editingId]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !event.defaultPrevented && !isSubmitting)
        onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSubmitting, onClose]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting || !trimmedPurpose || editing) return;

    onSubmit({ purpose: trimmedPurpose, reservationStatus, subPurposes });
  };

  return (
    <Overlay
      onClick={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) onClose();
      }}
    >
      <Dialog
        ref={dialogRef}
        role='dialog'
        aria-modal='true'
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <Form onSubmit={handleSubmit}>
          <Header>
            <Title id={titleId}>{text.title}</Title>
            <CloseButton
              type='button'
              onClick={onClose}
              disabled={isSubmitting}
              aria-label='닫기'
            >
              <MdClose aria-hidden='true' />
            </CloseButton>
          </Header>

          <Field>
            <Label htmlFor={inputId}>
              방문 목적 이름
              {mode === 'update' && <Required aria-hidden='true'>*</Required>}
            </Label>
            <Input
              ref={inputRef}
              id={inputId}
              value={purpose}
              onChange={(event) => setPurpose(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
                  event.preventDefault();
                  subPurposeInputRef.current?.focus(); // Enter 누르면 하위 목적 입력창으로 이동하게 개선함.
                }
              }}
              placeholder='예: 노래방, PC, 독서'
              maxLength={30}
              required
              disabled={isSubmitting}
            />
          </Field>

          <ReservationSetting>
            <SettingTitle id={reservationSettingId}>
              <LuCalendarCheck aria-hidden='true' />
              상위 방문 목적 예약 가능
            </SettingTitle>
            <Switch
              type='button'
              role='switch'
              aria-checked={reservationStatus}
              aria-labelledby={reservationSettingId}
              $isOn={reservationStatus}
              disabled={isSubmitting}
              onClick={() => setReservationStatus((current) => !current)}
            />
          </ReservationSetting>

          <Field>
            <Label htmlFor={subPurposeInputId}>하위 방문 목적</Label>
            {subPurposes.map((item) =>
              editing?.id === item.id ? (
                <EditCard key={item.id}>
                  <Label htmlFor={editInputId}>하위 방문 목적 이름</Label>
                  <Input
                    ref={editInputRef}
                    id={editInputId}
                    value={editing.name}
                    maxLength={30}
                    disabled={isSubmitting}
                    onChange={(event) =>
                      setEditing({ ...editing, name: event.target.value })
                    }
                    onKeyDown={(event) => {
                      if (event.nativeEvent.isComposing) return;
                      if (event.key === 'Enter') {
                        event.preventDefault();
                        saveSubPurpose();
                      }
                      if (event.key === 'Escape') {
                        event.preventDefault();
                        event.stopPropagation(); //이벤트 버블링 방어를 위해 추가.
                        setEditing(null);
                      }
                    }}
                  />
                  <EditFooter>
                    <SubPurposeCheckbox>
                      <input
                        type='checkbox'
                        checked={editing.reservable}
                        disabled={isSubmitting}
                        onChange={(event) =>
                          setEditing({
                            ...editing,
                            reservable: event.target.checked,
                          })
                        }
                      />
                      예약 가능
                    </SubPurposeCheckbox>
                    <InlineActions>
                      <InlineAction
                        type='button'
                        $variant='secondary'
                        onClick={() => setEditing(null)}
                      >
                        취소
                      </InlineAction>
                      <InlineAction
                        type='button'
                        $variant='primary'
                        onClick={saveSubPurpose}
                        disabled={isSubmitting || !editing.name.trim()}
                      >
                        저장
                      </InlineAction>
                    </InlineActions>
                  </EditFooter>
                </EditCard>
              ) : (
                <SubPurposeCard key={item.id}>
                  <SubPurposeName>{item.name}</SubPurposeName>
                  {item.reservable && (
                    <ReservableBadge>
                      <LuCalendarCheck aria-hidden='true' />
                      예약 가능
                    </ReservableBadge>
                  )}
                  <InlineActions>
                    <IconAction
                      type='button'
                      aria-label={`${item.name} 수정`}
                      disabled={isSubmitting || editing !== null}
                      onClick={() => setEditing(item)}
                    >
                      <MdOutlineEdit aria-hidden='true' />
                    </IconAction>
                    <DeleteAction
                      type='button'
                      aria-label={`${item.name} 삭제`}
                      disabled={isSubmitting || editing !== null}
                      onClick={() =>
                        setSubPurposes((current) =>
                          current.filter(({ id }) => id !== item.id),
                        )
                      }
                    >
                      <MdClose aria-hidden='true' />
                    </DeleteAction>
                  </InlineActions>
                </SubPurposeCard>
              ),
            )}
            <SubPurposeEntry>
              <MdAdd aria-hidden='true' />
              <SubPurposeInput
                ref={subPurposeInputRef}
                id={subPurposeInputId}
                value={newSubPurpose.name}
                onChange={(event) =>
                  setNewSubPurpose({
                    ...newSubPurpose,
                    name: event.target.value,
                  })
                }
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
                    event.preventDefault();
                    addSubPurpose();
                  }
                }}
                placeholder='하위 방문 목적 이름 입력'
                maxLength={30}
                disabled={isSubmitting}
              />
              <SubPurposeCheckbox>
                <input
                  type='checkbox'
                  checked={newSubPurpose.reservable}
                  disabled={isSubmitting}
                  onChange={(event) =>
                    setNewSubPurpose({
                      ...newSubPurpose,
                      reservable: event.target.checked,
                    })
                  }
                />
                예약 가능
              </SubPurposeCheckbox>
              <InlineAction
                type='button'
                $variant='primary'
                onClick={addSubPurpose}
                disabled={isSubmitting || !newSubPurpose.name.trim()}
              >
                추가
              </InlineAction>
            </SubPurposeEntry>
          </Field>

          <Actions>
            <ActionButton
              type='button'
              $variant='secondary'
              onClick={onClose}
              disabled={isSubmitting}
            >
              취소
            </ActionButton>
            <ActionButton
              type='submit'
              $variant='primary'
              disabled={isSubmitting || editing !== null}
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
  padding: 1.5rem clamp(1rem, 5.5vw, 1.6875rem);
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
  gap: 1.25rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${ColorData.spacing[16]};
`;

const Title = styled.h2`
  margin: 0;
  color: ${PurposeColors.gray40};
  font-family: inherit;
  font-size: 1.25rem;
  font-weight: 700;
`;

const CloseButton = styled.button`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
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
  font-size: 0.8125rem;
  font-weight: 500;
`;

const Required = styled.span`
  color: ${PurposeColors.error};
`;

const Input = styled.input`
  height: 2.75rem;
  padding: 0 1rem;
  box-sizing: border-box;
  border: 1px solid ${PurposeColors.gray30};
  border-radius: 0.75rem;
  background-color: ${ColorData.colors.background};
  color: ${PurposeColors.gray40};
  font-family: inherit;
  font-size: 0.875rem;

  &:focus-visible {
    outline: 1px solid ${PurposeColors.blue};
    outline-offset: -1px;
  }

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

const SubPurposeEntry = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  min-height: 3rem;
  padding: 0.5rem 0.4375rem 0.5rem 0.8125rem;
  box-sizing: border-box;
  border: 1px dashed ${PurposeColors.gray30};
  border-radius: 0.625rem;
  color: ${PurposeColors.gray10};

  > svg {
    flex: 0 0 auto;
  }
`;

const SubPurposeInput = styled.input`
  flex: 1;
  min-width: min(10rem, 100%);
  padding: 0;
  border: 0;
  background: transparent;
  color: ${PurposeColors.gray40};
  font: inherit;
  font-size: 0.875rem;
`;

const SubPurposeCheckbox = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  flex-shrink: 0;
  color: ${PurposeColors.gray10};
  font-size: 0.8125rem;
  white-space: nowrap;

  input {
    width: 1rem;
    height: 1rem;
    margin: 0;
    accent-color: ${PurposeColors.blue};
  }
`;

const SubPurposeCard = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 3rem;
  padding: 0.4375rem 0.5625rem 0.4375rem 0.9375rem;
  box-sizing: border-box;
  border: 1px solid ${PurposeColors.gray30};
  border-radius: 0.625rem;
  color: ${PurposeColors.gray40};
  font-size: 0.875rem;
`;

const SubPurposeName = styled.span`
  min-width: 0;
  overflow-wrap: anywhere;
`;

const ReservableBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.1875rem 0.5rem;
  border-radius: 999px;
  background: ${PurposeColors.skyblue};
  color: ${ColorData.colors.background};
  font-size: 0.75rem;
  white-space: nowrap;
`;

const EditCard = styled(Field)`
  gap: 0.625rem;
  padding: 0.875rem;
  border: 1px solid ${PurposeColors.blue};
  border-radius: 0.625rem;
`;

const EditFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
`;

const InlineActions = styled.div`
  display: flex;
  gap: 0.375rem;
  margin-left: auto;
  flex-shrink: 0;
`;

const IconAction = styled.button`
  display: grid;
  place-items: center;
  width: 1.75rem;
  height: 1.75rem;
  padding: 0;
  border: 0;
  border-radius: 0.375rem;
  background: transparent;
  color: ${PurposeColors.gray30};
  font-size: 1.125rem;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${ColorData.colors.fillNormal};
  }

  &:disabled {
    cursor: default;
  }
`;

const DeleteAction = styled(IconAction)`
  color: ${PurposeColors.error};
  font-size: 1.375rem;
`;

const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${ColorData.spacing[8]};
`;

const ActionButton = styled.button<{ $variant: 'primary' | 'secondary' }>`
  height: 2.8125rem;
  border: 1px solid
    ${({ $variant }) =>
      $variant === 'primary' ? PurposeColors.blue : PurposeColors.gray30};
  border-radius: 0.75rem;
  background-color: ${({ $variant }) =>
    $variant === 'primary' ? PurposeColors.blue : ColorData.colors.background};
  color: ${({ $variant }) =>
    $variant === 'primary'
      ? ColorData.colors.background
      : PurposeColors.gray40};
  font-family: inherit;
  font-size: 0.875rem;
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

const InlineAction = styled(ActionButton)`
  flex-shrink: 0;
  height: 1.875rem;
  padding: 0 0.75rem;
  border-radius: 0.4375rem;
  font-size: 0.8125rem;
`;
