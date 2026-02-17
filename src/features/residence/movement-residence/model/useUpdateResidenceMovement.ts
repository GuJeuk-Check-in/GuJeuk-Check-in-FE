import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { updateResidenceMovement } from '@entities/residence/index';
import { UpdateResidenceMovementRequest } from '@entities/residence/index';

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
