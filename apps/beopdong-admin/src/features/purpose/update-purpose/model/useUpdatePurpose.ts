import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { updatePurpose, type UpdatePurposeRequest } from '@entities/purpose';

interface UpdatePurposeVariables extends UpdatePurposeRequest {
  purposeId: number;
}

export const useUpdatePurpose = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ message?: string; description?: string }>, UpdatePurposeVariables>({
    mutationFn: ({ purposeId, purposeName }) => updatePurpose(purposeId, { purposeName }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['purposeList'] });
    },
  });
};
