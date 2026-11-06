import { useModal } from '@shared/hooks';
import { useUpdatePurpose } from '../model/useUpdatePurpose';
import { FaRegCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { AxiosError } from 'axios';

export const useUpdatePurposeHandler = () => {
  const { openModal, closeModal, isOpen, config } = useModal();
  const mutation = useUpdatePurpose();

  const handleUpdate = (id: number, newPurpose: string) => {
    openModal({
      title: '예약 필요 여부',
      subtitle: '이 시설을 이용할 때 예약이 필요한가요?',
      buttons: [
        { label: '취소', variant: 'secondary', onClick: closeModal },
        { label: '예약 불필요', variant: 'secondary', onClick: () => executeUpdate(id, newPurpose, false) },
        { label: '예약 필요', variant: 'primary', onClick: () => executeUpdate(id, newPurpose, true) },
      ],
    });
  };

  const executeUpdate = (id: number, newPurpose: string, reservationStatus: boolean) => {
    closeModal();
    mutation.mutate(
      { id, purpose: newPurpose, reservationStatus },
      {
        onSuccess: () => {
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
    handleUpdate,
    isLoading: mutation.isPending,
    isOpen,
    config,
  };
};
