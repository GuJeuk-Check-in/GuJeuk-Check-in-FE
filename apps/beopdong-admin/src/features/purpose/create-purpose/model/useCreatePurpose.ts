import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { createPurpose, type CreatePurposeRequest } from '@entities/purpose';

export const useCreatePurpose = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ message?: string }>, CreatePurposeRequest>({
    mutationFn: createPurpose,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purposeList'] });
    },
  });
};
