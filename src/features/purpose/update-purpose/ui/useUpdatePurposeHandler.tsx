import { useModal } from '@shared/hooks/useModal';
import { useUpdatePurpose } from '../model/useUpdatePurpose';
import { MODAL_COMMENT } from '@entities/record/modal/ModalComment';
import { FaRegCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { AxiosError } from 'axios';

export const useUpdatePurposeHandler = () => {
  const { openModal, closeModal } = useModal();
  const mutation = useUpdatePurpose();

  const handleUpdate = (id: number, newPurpose: string) => {
    mutation.mutate(
      { id, purpose: newPurpose },
      {
        onSuccess: () => {
          openModal({
            icon: <FaRegCheckCircle size={48} color="#0F50A0" />,
            title: MODAL_COMMENT.PURPOSE_UPDATE_SUCCESS.title,
            subtitle: MODAL_COMMENT.PURPOSE_UPDATE_SUCCESS.subtitle,
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
            title: MODAL_COMMENT.PURPOSE_UPDATE_FAIL(message).title,
            subtitle: MODAL_COMMENT.PURPOSE_UPDATE_FAIL(message).subtitle,
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
