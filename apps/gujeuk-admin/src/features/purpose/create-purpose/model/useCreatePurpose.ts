import {
  createPurpose,
  createSubPurpose,
  purposeList,
  toReservationStatus,
  usePurposeStore,
  type PurposeFormValues,
} from '@entities/purpose';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreatePurpose = () => {
  const queryClient = useQueryClient();
  const setSubPurposes = usePurposeStore((state) => state.setSubPurposes);

  return useMutation<
    void,
    AxiosError<{ message?: string }>,
    PurposeFormValues
  >({
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

    onSuccess: async (_, { purpose, subPurposes }) => {
      const purposes = await queryClient.fetchQuery({
        queryKey: ['purposeList'],
        queryFn: purposeList,
        staleTime: 0,
      });

      if (!subPurposes.length) return;

      const created = purposes.find((item) => item.purpose === purpose);
      if (created) setSubPurposes(created.id, subPurposes);
    },
  });
};
