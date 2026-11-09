import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  updatePurpose,
  usePurposeStore,
  UpdatePurposeRequest,
} from '@entities/purpose';
import { reservationListKey } from '@entities/reservation';

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
        purpose: variables.purpose,
        reservationStatus: variables.reservationStatus,
      });
    },
    onSuccess: (_, variables) => {
      updateLocalPurpose(variables.id, variables.purpose);
      queryClient.invalidateQueries({ queryKey: ['purposeList'] });
      queryClient.invalidateQueries({ queryKey: reservationListKey });
    },
  });
};
