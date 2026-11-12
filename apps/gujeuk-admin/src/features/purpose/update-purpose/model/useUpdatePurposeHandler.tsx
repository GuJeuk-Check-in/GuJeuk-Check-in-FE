import { useState } from 'react';
import type { Purpose, PurposeFormValues } from '@entities/purpose';
import { useModal } from '@shared/hooks';
import { useUpdatePurpose } from '../model/useUpdatePurpose';
import { FaRegCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { AxiosError } from 'axios';

export const useUpdatePurposeHandler = () => {
  const { openModal, closeModal, isOpen, config } = useModal();
  const mutation = useUpdatePurpose();
  const [editingPurpose, setEditingPurpose] = useState<Purpose | null>(null);

  const startEdit = (purpose: Purpose) => {
    setEditingPurpose(purpose);
  };

  const cancelEdit = () => {
    setEditingPurpose(null);
  };

  const handleUpdate = (values: PurposeFormValues) => {
    if (!editingPurpose) return;

    mutation.mutate(
      { id: editingPurpose.id, ...values },
      {
        onSuccess: () => {
          setEditingPurpose(null);
          openModal({
            icon: <FaRegCheckCircle size={48} color="#0F50A0" />,
            title: '수정 완료',
            subtitle: '방문 목적이 성공적으로 수정되었습니다.',
            theme: 'info',
            buttons: [
              {
                label: '확인',
                onClick: closeModal,
              },
            ],
          });
        },
        onError: (error: AxiosError<{ message?: string }>) => {
          const message =
            error.response?.data?.message ||
            error.message ||
            '수정 중 오류가 발생했습니다.';

          openModal({
            icon: <FaExclamationTriangle size={48} color="#D88282" />,
            title: '수정 실패',
            subtitle: message || '수정 중 오류가 발생했습니다.',
            theme: 'warning',
            buttons: [
              {
                label: '확인',
                variant: 'primary',
                onClick: closeModal,
              },
            ],
          });
        },
      }
    );
  };

  return {
    editingPurpose,
    startEdit,
    cancelEdit,
    handleUpdate,
    isLoading: mutation.isPending,
    isOpen,
    config,
  };
};
