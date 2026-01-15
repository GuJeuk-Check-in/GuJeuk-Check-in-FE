import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { updatePurposeMovement } from '@entities/purpose/api/purpose.api';
import { UpdatePurposeMovementRequest } from '@entities/purpose/model/types';

export const useUpdatePurposeMovement = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    AxiosError<{ message?: string }>,
    UpdatePurposeMovementRequest
  >({
    mutationFn: updatePurposeMovement,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['purposeList'],
      });
    },
  });
};
