import { useModal } from '@shared/hooks/useModal';
import { useUpdateResidence } from '../model/useUpdateResidence';
import { FaRegCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { AxiosError } from 'axios';

export const useUpdateResidenceHandler = () => {
  const { openModal, closeModal } = useModal();
  const mutation = useUpdateResidence();

  const handleUpdate = (id: number, newResidence: string) => {
    mutation.mutate(
      { id, residence: newResidence },
      {
        onSuccess: () => {
          openModal({
            icon: <FaRegCheckCircle size={48} color="#0F50A0" />,
            title: '수정 완료',
            subtitle: '거주지가 성공적으로 수정되었습니다.',
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
    handleUpdate,
    isLoading: mutation.isPending,
  };
};
