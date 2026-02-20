import { useModal, UseModalReturn } from '@shared/hooks/useModal';
import { useDeleteResidence } from '../model/useDeleteResidence';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useState } from 'react';

interface UseDeleteResidenceHandlerParams {
  modal: UseModalReturn;
}

export const useDeleteResidenceHandler = ({
  modal,
}: UseDeleteResidenceHandlerParams) => {
  const { openModal, closeModal } = modal;
  const mutation = useDeleteResidence(modal);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    openModal({
      icon: <FaExclamationTriangle size={48} color="#D88282" />,
      title: '정말로 이 거주지를 삭제하시겠습니까?',
      subtitle: '삭제한 거주지는 복구할 수 없습니다.',
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
    mutation.mutate(id);
  };

  return {
    handleDelete,
    deletingId,
  };
};
