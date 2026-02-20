import { deleteResidence } from '@entities/residence/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UseModalReturn } from '@shared/hooks/useModal';
import { FaRegCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { ResidenceResponse } from '@entities/residence/model/types';

export const useDeleteResidence = (modal?: UseModalReturn) => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ message?: string }>, number>({
    mutationFn: deleteResidence,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['residenceList'] });
      
      const previousData = queryClient.getQueryData<ResidenceResponse[]>(['residenceList']);
      
      queryClient.setQueryData<ResidenceResponse[]>(['residenceList'], (old) => {
        if (!old) return old;
        return old.filter((item) => item.id !== id);
      });

      return { previousData };
    },
    onError: (error: AxiosError<{ message?: string }>, id, context: { previousData: ResidenceResponse[] | undefined } | undefined) => {
      if (context?.previousData) {
        queryClient.setQueryData(['residenceList'], context.previousData);
      }

      if (modal?.openModal) {
        const message =
          error.response?.data?.message ||
          error.message ||
          '삭제 중 오류가 발생했습니다.';

        modal.openModal({
          title: '삭제 실패',
          subtitle: message,
          theme: 'warning',
          buttons: [
            {
              label: '확인',
              variant: 'primary',
              onClick: modal.closeModal,
            },
          ],
        });
      }
    },
    onSuccess: () => {
      if (modal?.openModal) {
        setTimeout(() => {
          modal.openModal({
            icon: <FaRegCheckCircle size={48} color="#0F50A0" />,
            title: '삭제 완료',
            subtitle: '거주지가 성공적으로 삭제되었습니다.',
            theme: 'info',
            buttons: [
              {
                label: '확인',
                onClick: modal.closeModal,
              },
            ],
          });
        }, 300);
      }
    },
  });
};
