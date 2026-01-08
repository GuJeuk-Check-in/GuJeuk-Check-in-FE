import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePurpose } from '../api';
import { AxiosError } from 'axios';
import { UpdatePurposeRequest } from '../types';
import usePurposeStore from '../../../store/PurposeStore';

export const useUpdatePurpose = () => {
  const queryClient = useQueryClient();
  const updateLocalPurpose = usePurposeStore((state) => state.updatePurpose);

  return useMutation<
    void,
    AxiosError<{ message?: string }>,
    UpdatePurposeRequest
  >({
    mutationFn: (variables) => {
      return updatePurpose(variables.id, { purpose: variables.purpose });
    },
    onSuccess: (_, variables) => {
      updateLocalPurpose(variables.id, variables.purpose);
      queryClient.invalidateQueries({ queryKey: ['purposeList'] });
      alert('방문 목적이 성공적으로 수정되었습니다.');
    },

    onError: (error) => {
      alert(
        error.response?.data?.message ?? error.message ?? '방문 목적 수정 실패'
      );
    },
  });
};
