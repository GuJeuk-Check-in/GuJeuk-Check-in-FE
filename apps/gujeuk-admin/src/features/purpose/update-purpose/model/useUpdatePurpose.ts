import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  updatePurpose,
  usePurposeStore,
  type PurposeFormValues,
} from '@entities/purpose';
import { reservationListKey } from '@entities/reservation';

export const useUpdatePurpose = () => {
  const queryClient = useQueryClient();
  const updateLocalPurpose = usePurposeStore((state) => state.updatePurpose);
  const setSubPurposes = usePurposeStore((state) => state.setSubPurposes);

  return useMutation<
    void,
    AxiosError<{ message?: string }>,
    PurposeFormValues & { id: number }
  >({
    mutationFn: (variables) => {
      return updatePurpose(variables.id, {
        purpose: variables.purpose,
        reservationStatus: variables.reservationStatus,
      });
    },
    onSuccess: (_, variables) => {
      updateLocalPurpose(variables.id, variables.purpose);
      setSubPurposes(variables.id, variables.subPurposes);
      queryClient.invalidateQueries({ queryKey: ['purposeList'] });
      queryClient.invalidateQueries({ queryKey: reservationListKey });
    },
  });
};
