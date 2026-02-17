import { useModal } from '@shared/hooks/useModal';
import { useDeleteResidence } from '../model/useDeleteResidence';
import { FaRegCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { AxiosError } from 'axios';
import { useState } from 'react';

export const useDeleteResidenceHandler = () => {
  const { openModal, closeModal } = useModal();
  const mutation = useDeleteResidence();
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

    mutation.mutate(id, {
      onSuccess: () => {
        closeModal();
        setDeletingId(null);

        setTimeout(() => {
          openModal({
            icon: <FaRegCheckCircle size={48} color="#0F50A0" />,
            title: '삭제 완료',
            subtitle: '거주지가 성공적으로 삭제되었습니다.',
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
          error.response?.data?.message ||
          error.message ||
          '삭제 중 오류가 발생했습니다.';

        setDeletingId(null);
        openModal({
          title: '삭제 실패',
          subtitle: message || '삭제 중 오류가 발생했습니다.',
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
    deletingId,
  };
};
