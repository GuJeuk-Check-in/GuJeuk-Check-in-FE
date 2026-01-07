import { deletePurpose } from '../api';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeletePurposeList = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ message?: string }>, number>({
    mutationFn: deletePurpose,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purposeList'] });
      alert('방문 목적이 성공적으로 삭제되었습니다.');
    },

    onError: (error) => {
      const message =
        error.response?.data?.message ??
        error.message ??
        '삭제 중 오류가 발생했습니다.';

      alert(message);
    },
  });
};
