import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePurpose } from '@entities/purpose/api/purpose.api';
import { AxiosError } from 'axios';
import { UpdatePurposeRequest } from '@entities/purpose/model/types';
import usePurposeStore from '@entities/purpose/model/purposeStore';

export const useUpdatePurpose = () => {
  const queryClient = useQueryClient();
  const updateLocalPurpose = usePurposeStore((state) => state.updatePurpose);

  return useMutation<
    void,
    AxiosError<{ message?: string }>,
    UpdatePurposeRequest
  >({
    mutationFn: (variables) => {
      return updatePurpose(variables.id, { purpose: variables.purpose });
    },
    onSuccess: (_, variables) => {
      updateLocalPurpose(variables.id, variables.purpose);
      queryClient.invalidateQueries({ queryKey: ['purposeList'] });
    },
  });
};
