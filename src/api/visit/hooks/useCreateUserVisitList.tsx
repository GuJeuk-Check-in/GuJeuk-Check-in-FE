import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createUserVisit } from '../api';
import { useModal } from '@shared/hooks/useModal';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { CreateUserVisitRequest, UserVisitDetailResponse } from '../types';
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
        title: '등록 실패',
        subtitle:
          error.response?.data?.message ||
          error.message ||
          '알 수 없는 오류가 발생했습니다.',
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
