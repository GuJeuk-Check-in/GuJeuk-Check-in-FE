import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  updateResidenceMovement,
  UpdateResidenceMovementRequest,
} from '@entities/residence';

export const useUpdateResidenceMovement = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    AxiosError<{ message?: string }>,
    UpdateResidenceMovementRequest
  >({
    mutationFn: updateResidenceMovement,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['residenceList'],
      });
    },
  });
};
