import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { updatePurposeMovement } from '../api';
import { UpdatePurposeMovementRequest } from '../types';

export const useUpdatePurposeMovement = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    AxiosError<{ message?: string }>,
    UpdatePurposeMovementRequest
  >({
    mutationFn: updatePurposeMovement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purposeList'] });
    },
  });
};
