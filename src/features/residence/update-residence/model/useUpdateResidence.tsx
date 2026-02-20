import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateResidence } from '@entities/residence/index';
import { AxiosError } from 'axios';
import { UpdateResidenceRequest, ResidenceResponse } from '@entities/residence/model/types';
import { useResidenceStore } from '@entities/residence/index';
import { UseModalReturn } from '@shared/hooks/useModal';
import { FaRegCheckCircle } from 'react-icons/fa';

export const useUpdateResidence = (modal?: UseModalReturn) => {
  const queryClient = useQueryClient();
  const updateLocalResidence = useResidenceStore(
    (state) => state.updateResidence
  );

  return useMutation<
    void,
    AxiosError<{ message?: string }>,
    UpdateResidenceRequest
  >({
    mutationFn: (variables) => {
      return updateResidence(variables.id, {
        id: variables.id,
        residenceName: variables.residenceName,
      });
    },
    onMutate: async (variables): Promise<{ previousData: ResidenceResponse[] | undefined }> => {
      await queryClient.cancelQueries({ queryKey: ['residenceList'] });
      
      const previousData = queryClient.getQueryData<ResidenceResponse[]>(['residenceList']);
      
      queryClient.setQueryData<ResidenceResponse[]>(['residenceList'], (old) => {
        if (!old) return old;
        return old.map((item) =>
          item.id === variables.id
            ? { ...item, residence: variables.residenceName }
            : item
        );
      });

      updateLocalResidence(variables.id, variables.residenceName);

      return { previousData };
    },
    onError: (err, variables, context: { previousData: ResidenceResponse[] | undefined } | undefined) => {
      if (context?.previousData) {
        queryClient.setQueryData(['residenceList'], context.previousData);
      }
    },
    onSuccess: () => {
      if (modal?.openModal) {
        modal.openModal({
          icon: <FaRegCheckCircle size={48} color="#0F50A0" />,
          title: '수정 완료',
          subtitle: '거주지가 성공적으로 수정되었습니다.',
          theme: 'info',
          buttons: [
            {
              label: '확인',
              onClick: modal.closeModal,
            },
          ],
        });
      }
    },
  });
};
