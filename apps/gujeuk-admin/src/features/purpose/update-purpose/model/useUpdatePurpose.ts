import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  updatePurpose,
  usePurposeStore,
  PurposeResponse,
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
        purpose: variables.purpose,
        reservationStatus: variables.reservationStatus,
      });
    },
    onSuccess: (_, variables) => {
      updateLocalPurpose(variables.id, variables.purpose);
      queryClient.setQueryData<PurposeResponse[]>(['purposeList'], (purposes) =>
        purposes?.map((purpose) =>
          purpose.id === variables.id
            ? {
                ...purpose,
                purpose: variables.purpose,
                reservationStatus: variables.reservationStatus,
              }
            : purpose
        )
      );
      queryClient.invalidateQueries({ queryKey: ['purposeList'] });
    },
  });
};
