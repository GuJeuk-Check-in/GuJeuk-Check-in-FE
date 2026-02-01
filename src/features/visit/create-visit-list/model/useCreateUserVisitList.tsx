import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createUserVisit } from '@entities/visit/index';
import { useModal } from '@shared/hooks/useModal';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { MODAL_COMMENT } from '@entities/record/modal/ModalComment';
import {
  CreateUserVisitRequest,
  UserVisitDetailResponse,
} from '@entities/visit/index';
import { AxiosError } from 'axios';

interface UseCreateUserVisitProps {
  onSuccessCallback?: () => void;
}

type UseCreateUserVisitReturn = UseMutationResult<
  UserVisitDetailResponse,
  AxiosError,
  CreateUserVisitRequest
> & {
  modal: ReturnType<typeof useModal>;
};

export const useCreateUserVisit = ({
  onSuccessCallback,
}: UseCreateUserVisitProps = {}): UseCreateUserVisitReturn => {
  const queryClient = useQueryClient();
  const modal = useModal();
  const navigate = useNavigate();

  const mutation = useMutation<
    UserVisitDetailResponse,
    AxiosError<{ message?: string }>,
    CreateUserVisitRequest
  >({
    mutationFn: createUserVisit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visitList'] });

      modal.openModal({
        icon: <FaCheckCircle size={48} color="#0F50A0" />,
        title: MODAL_COMMENT.CREATE_SUCCESS.title,
        subtitle: MODAL_COMMENT.CREATE_SUCCESS.subtitle,
        theme: 'info',
        buttons: [
          {
            label: '확인',
            variant: 'primary',
            bgColor: '#0F50A0',
            onClick: () => {
              modal.closeModal();
              onSuccessCallback?.();
              navigate('/log');
            },
          },
        ],
      });
    },
    onError: (error) => {
      console.error('이용 기록 생성 중 오류 발생:', error);

      modal.openModal({
        icon: <FaExclamationTriangle size={48} color="#D88282" />,
        title: MODAL_COMMENT.CREATE_FAIL(
          error.response?.data?.message || error.message
        ).title,
        subtitle: MODAL_COMMENT.CREATE_FAIL(
          error.response?.data?.message || error.message
        ).subtitle,
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