import { useModal } from '@shared/hooks/useModal';
import { useDeletePurposeList } from '../model/useDeletePurpose';
import { MODAL_COMMENT } from '@entities/record/modal/ModalComment';
import { FaRegCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { AxiosError } from 'axios';
import { useState } from 'react';

export const useDeletePurposeHandler = () => {
  const { openModal, closeModal, isOpen, config } = useModal();
  const mutation = useDeletePurposeList();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    openModal({
      icon: <FaExclamationTriangle size={48} color="#D88282" />,
      title: MODAL_COMMENT.PURPOSE_DELETE_CONFIRM.title,
      subtitle: MODAL_COMMENT.PURPOSE_DELETE_CONFIRM.subtitle,
      theme: 'warning',
      buttons: [
        {
          label: '취소',
          variant: 'secondary',
          onClick: () => {
            setDeletingId(null);
            closeModal();
          },
        },
        {
          label: '삭제',
          variant: 'primary',
          onClick: () => executeDelete(id),
        },
      ],
    });
  };

  const executeDelete = (id: number) => {
    setDeletingId(id);

    mutation.mutate(id, {
      onSuccess: () => {
        closeModal();
        setDeletingId(null);

        setTimeout(() => {
          openModal({
            icon: <FaRegCheckCircle size={48} color="#0F50A0" />,
            title: MODAL_COMMENT.PURPOSE_DELETE_SUCCESS.title,
            subtitle: MODAL_COMMENT.PURPOSE_DELETE_SUCCESS.subtitle,
            theme: 'info',
            buttons: [
              {
                label: '확인',
                onClick: closeModal,
              },
            ],
          });
        }, 300);
      },
      onError: (error: AxiosError<{ message?: string }>) => {
        const message =
          error.response?.data?.message || '삭제 중 오류가 발생했습니다.';

        setDeletingId(null);
        openModal({
          title: MODAL_COMMENT.PURPOSE_DELETE_FAIL(message).title,
          subtitle: MODAL_COMMENT.PURPOSE_DELETE_FAIL(message).subtitle,
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
    });
  };

  return {
    handleDelete,
    isLoading: mutation.isPending,
    deletingId,
    isOpen,
    config,
  };
};
