import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { deletePurpose } from '@entities/purpose';

export const useDeletePurpose = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ message?: string; description?: string }>, number>({
    mutationFn: deletePurpose,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['purposeList'] });
    },
  });
};
