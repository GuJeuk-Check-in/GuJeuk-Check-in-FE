import {
  createPurpose,
  createSubPurpose,
  toReservationStatus,
  type PurposeFormValues,
} from '@entities/purpose';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreatePurpose = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ message?: string }>, PurposeFormValues>(
    {
      mutationFn: async ({ purpose, reservationStatus, subPurposes }) => {
        if (!subPurposes.length) {
          await createPurpose({
            purpose,
            reservationStatus: toReservationStatus(false, reservationStatus),
          });
          return;
        }

        for (const subPurpose of subPurposes) {
          await createSubPurpose({
            purpose,
            reservationStatus: 'SUB_INCLUDE',
            subPurpose: subPurpose.name,
            subPurposeReservation: subPurpose.reservable,
          });
        }
      },

      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['purposeList'] });
      },
    }
  );
};
