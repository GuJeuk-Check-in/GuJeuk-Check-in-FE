import { useState } from 'react';
import styled from '@emotion/styled';
import { AddTileContainer } from '@center/ui/card';
import { MdAdd } from 'react-icons/md';
import {
  PurposeColors,
  PurposeFormModal,
  type PurposeFormValues,
} from '@entities/purpose';
import { useCreatePurpose } from '../model/useCreatePurpose';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useModal } from '@shared/hooks/useModal';
import { Modal } from '../../../../shared/ui/modal/Modal';

export const PurposeAddBox = () => {
  const { mutate: createMutate, isPending: isCreating } = useCreatePurpose();
  const { isOpen, config, openModal, closeModal } = useModal();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAdd = (values: PurposeFormValues) => {
    if (isCreating) return;

    createMutate(
      values,
      {
        onSuccess: () => {
          setIsFormOpen(false);
          openModal({
            icon: <FaCheckCircle color="#0F50A0" />,
            title: '생성 성공',
            subtitle: `"${values.purpose}" 목적이 추가되었습니다.`,
            theme: 'info',
            buttons: [
              {
                label: '확인',
                variant: 'secondary',
                onClick: closeModal,
              },
            ],
          });
        },
        onError: (error) => {
          const message = error.response?.data?.message || '생성 실패';
          openModal({
            icon: <FaExclamationTriangle color="#D88282" />,
            title: '생성 실패',
            subtitle: message || '생성 실패',
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
        onClick={isCreating ? undefined : () => setIsFormOpen(true)}
        role="button"
        tabIndex={isCreating ? -1 : 0}
        onKeyDown={(event) => {
          if (!isCreating && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            setIsFormOpen(true);
          }
        }}
        aria-label="방문 목적 추가"
      >
        <MdAdd aria-hidden="true" />
      </Container>

      {isFormOpen && (
        <PurposeFormModal
          mode="create"
          isSubmitting={isCreating}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleAdd}
        />
      )}

      {isOpen && config && (
        <Modal isOpen={isOpen} config={config} onClose={closeModal} />
      )}
    </>
  );
};

const Container = styled(AddTileContainer)`
  margin: 0;
  border: 0;
  background-color: #ffffff;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  color: ${({ $isDisabled }) => ($isDisabled ? '#cccccc' : PurposeColors.blue)};
  outline: 0 solid ${PurposeColors.skyblue};
  outline-offset: -1px;
  transition: outline-width 0.15s ease;

  svg {
    width: 3.5rem;
    height: 3.5rem;
  }

  &:hover,
  &:focus-visible {
    background-color: #ffffff;
    outline-width: ${({ $isDisabled }) => ($isDisabled ? '0' : '1px')};
  }
`;
