import { deletePurpose } from '@entities/purpose';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeletePurposeList = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ message?: string }>, number>({
    mutationFn: deletePurpose,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['purposeList'] });
    },
  });
};
