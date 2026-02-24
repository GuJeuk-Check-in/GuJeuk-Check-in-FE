import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  updatePurpose,
  usePurposeStore,
  UpdatePurposeRequest,
} from '@entities/purpose';

export const useUpdatePurpose = () => {
  const queryClient = useQueryClient();
  const updateLocalPurpose = usePurposeStore((state) => state.updatePurpose);

  return useMutation<
    void,
    AxiosError<{ message?: string }>,
    UpdatePurposeRequest
  >({
    mutationFn: (variables) => {
      return updatePurpose(variables.id, {
        id: variables.id,
        purpose: variables.purpose,
      });
    },
    onSuccess: (_, variables) => {
      updateLocalPurpose(variables.id, variables.purpose);
      queryClient.invalidateQueries({ queryKey: ['purposeList'] });
    },
  });
};
