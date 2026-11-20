import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { updatePurposeMovement, type UpdatePurposeMovementRequest } from '@entities/purpose';

export const useUpdatePurposeMovement = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ message?: string; description?: string }>, UpdatePurposeMovementRequest>({
    mutationFn: updatePurposeMovement,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['purposeList'] });
    },
  });
};
