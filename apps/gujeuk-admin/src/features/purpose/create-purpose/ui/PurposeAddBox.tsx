import { AddTileContainer as Container } from '@center/ui/card';
import styled from '@emotion/styled';
import { useState, type FormEvent } from 'react';
import { MdAdd } from 'react-icons/md';
import { useCreatePurpose } from '../model/useCreatePurpose';
import type { CreatePurposeRequest } from '@entities/purpose';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useModal } from '@shared/hooks/useModal';
import { Modal } from '../../../../shared/ui/modal/Modal';

export const PurposeAddBox = () => {
  const { mutate: createMutate, isPending: isCreating } = useCreatePurpose();
  const { isOpen, config, openModal, closeModal } = useModal();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [purpose, setPurpose] = useState('');
  const [reservationStatus, setReservationStatus] = useState(false);

  const handleAdd = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedPurpose = purpose.trim();
    if (!trimmedPurpose || isCreating) return;
    const payload: CreatePurposeRequest = {
      purpose: trimmedPurpose,
      reservationStatus,
    };
    createMutate(
      payload,
      {
        onSuccess: () => {
          setIsAddOpen(false);
          setPurpose('');
          setReservationStatus(false);
          openModal({
            icon: <FaCheckCircle color="#0F50A0" />,
            title: '생성 성공',
            subtitle: `"${trimmedPurpose}" 목적이 추가되었습니다.`,
            theme: 'info',
            buttons: [{ label: '확인', onClick: closeModal }],
          });
        },
        onError: (error) => {
          const message =
            error.response?.data?.message || error.message || '생성 실패';
          openModal({
            icon: <FaExclamationTriangle color="#D88282" />,
            title: '생성 실패',
            subtitle: message,
            theme: 'warning',
            buttons: [
              { label: '닫기', variant: 'secondary', onClick: closeModal },
            ],
          });
        },
      }
    );
  };

  return (
    <>
      <Container
        $isAddButton
        $isDisabled={isCreating}
        onClick={isCreating ? undefined : () => setIsAddOpen(true)}
        role="button"
        tabIndex={isCreating ? -1 : 0}
        onKeyDown={(event) => {
          if (!isCreating && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            setIsAddOpen(true);
          }
        }}
        aria-label="방문 목적 추가"
      >
        <MdAdd size={48} color={isCreating ? '#ccc' : '#3D72B3'} />
      </Container>

      {isAddOpen && (
        <Modal
          isOpen
          onClose={() => {
            if (!isCreating) setIsAddOpen(false);
          }}
          size="compact"
          showCloseButton
          config={{
            title: '방문 목적 추가',
            subtitle: '새 방문 목적을 추가하고 예약 여부를 설정하세요.',
          }}
        >
          <AddForm onSubmit={handleAdd}>
            <Field>
              <FieldLabel htmlFor="purpose-name">방문 목적 이름</FieldLabel>
              <PurposeInput
                id="purpose-name"
                value={purpose}
                onChange={(event) => setPurpose(event.target.value)}
                placeholder="예: 노래방, PC, 독서"
                maxLength={50}
                disabled={isCreating}
                required
                autoFocus
              />
            </Field>
            <ReservationOption>
              <ReservationOptionText>
                <strong>예약 가능 시설</strong>
                <span>이 목적을 예약 가능한 시설로 설정해요.</span>
              </ReservationOptionText>
              <ReservationSwitch
                type="button"
                role="switch"
                aria-checked={reservationStatus}
                aria-label="예약 가능 시설"
                $isEnabled={reservationStatus}
                onClick={() => setReservationStatus((current) => !current)}
                disabled={isCreating}
              >
                <SwitchThumb $isEnabled={reservationStatus} />
              </ReservationSwitch>
            </ReservationOption>
            <ActionRow>
              <ActionButton
                type="button"
                $variant="secondary"
                onClick={() => setIsAddOpen(false)}
                disabled={isCreating}
              >
                취소
              </ActionButton>
              <ActionButton
                type="submit"
                $variant="primary"
                disabled={isCreating || !purpose.trim()}
              >
                {isCreating ? '추가 중...' : '추가하기'}
              </ActionButton>
            </ActionRow>
          </AddForm>
        </Modal>
      )}
      {isOpen && config && (
        <Modal isOpen={isOpen} config={config} onClose={closeModal} />
      )}
    </>
  );
};

const AddForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: left;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

const FieldLabel = styled.label`
  color: #353535;
  font-size: 0.75rem;
  font-weight: 600;
`;

const PurposeInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 2.5rem;
  padding: 0 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  outline: none;
  font: inherit;
  font-size: 0.75rem;

  &:focus {
    border-color: #3d72b3;
  }
`;

const ReservationOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: #f7f7f7;
`;

const ReservationOptionText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  strong {
    color: #353535;
    font-size: 0.75rem;
  }

  span {
    color: #858585;
    font-size: 0.625rem;
  }
`;

const ReservationSwitch = styled.button<{ $isEnabled: boolean }>`
  display: flex;
  align-items: center;
  width: 2.25rem;
  height: 1.25rem;
  padding: 0.125rem;
  border: 0;
  border-radius: 999px;
  background: ${({ $isEnabled }) => ($isEnabled ? '#3d72b3' : '#d9d9d9')};
  cursor: pointer;
  transition: background 0.15s ease;

  &:disabled {
    cursor: not-allowed;
  }
`;

const SwitchThumb = styled.span<{ $isEnabled: boolean }>`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: white;
  transform: translateX(${({ $isEnabled }) => ($isEnabled ? '1rem' : '0')});
  transition: transform 0.15s ease;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.125rem;
`;

const ActionButton = styled.button<{ $variant: 'primary' | 'secondary' }>`
  flex: 1;
  min-height: 2.25rem;
  border: 0;
  border-radius: 0.5rem;
  background: ${({ $variant }) =>
    $variant === 'primary' ? '#1671ed' : '#f1f1f1'};
  color: ${({ $variant }) => ($variant === 'primary' ? '#fff' : '#444')};
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
