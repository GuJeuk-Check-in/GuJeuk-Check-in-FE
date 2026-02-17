import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateResidence } from '@entities/residence/index';
import { AxiosError } from 'axios';
import { UpdateResidenceRequest } from '@entities/residence/model/types';
import { useResidenceStore } from '@entities/residence/index';

export const useUpdateResidence = () => {
  const queryClient = useQueryClient();
  const updateLocalResidence = useResidenceStore(
    (state) => state.updateResidence
  );

  return useMutation<
    void,
    AxiosError<{ message?: string }>,
    UpdateResidenceRequest
  >({
    mutationFn: (variables) => {
      return updateResidence(variables.id, {
        id: variables.id,
        residence: variables.residence,
      });
    },
    onSuccess: (_, variables) => {
      updateLocalResidence(variables.id, variables.residence);
      queryClient.invalidateQueries({ queryKey: ['residenceList'] });
    },
  });
};
