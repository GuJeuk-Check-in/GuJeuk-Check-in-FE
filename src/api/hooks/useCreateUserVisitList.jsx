import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUserVisit } from '../visitApi';
import { useModal } from '../../hooks/useModal';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

export const useCreateUserVisit = (onSuccessCallback) => {
  const queryClient = useQueryClient();

  const modal = useModal();

  const mutation = useMutation({
    mutationFn: createUserVisit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visits'] });

      modal.openModal({
        icon: <FaCheckCircle size={48} color="#0F50A0" />,
        title: '등록 완료',
        subtitle: '시설 이용 추가가 완료되었습니다.',
        theme: 'info',
        buttons: [
          {
            label: '확인',
            variant: 'primary',
            bgColor: '#3b82f6',
            onClick: () => {
              modal.closeModal();
              if (onSuccessCallback) {
                onSuccessCallback();
              }
            },
          },
        ],
      });
    },
    onError: (error) => {
      console.error('이용 기록 생성 중 오류 발생:', error);

      modal.openModal({
        icon: <FaExclamationTriangle size={48} color="#D88282" />,
        title: '등록 실패',
        subtitle: error.message || '알 수 없는 오류가 발생했습니다.',
        theme: 'warning',
        buttons: [
          {
            label: '확인',
            variant: 'secondary',
            onClick: modal.closeModal,
          },
        ],
      });
    },
  });

  return { ...mutation, modal };
};
