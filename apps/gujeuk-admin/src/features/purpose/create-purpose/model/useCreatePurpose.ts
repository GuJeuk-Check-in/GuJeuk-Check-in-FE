import {
  createPurpose,
  usePurposeStore,
  type PurposeFormValues,
  type PurposeResponse,
} from '@entities/purpose';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreatePurpose = () => {
  const queryClient = useQueryClient();
  const setSubPurposes = usePurposeStore((state) => state.setSubPurposes);

  return useMutation<
    PurposeResponse,
    AxiosError<{ message?: string }>,
    PurposeFormValues
  >({
    mutationFn: ({ purpose, reservationStatus }) =>
      createPurpose({ purpose, reservationStatus }),

    onSuccess: (createdPurpose, { subPurposes }) => {
      if (typeof createdPurpose?.id === 'number') {
        setSubPurposes(createdPurpose.id, subPurposes);
      }

      queryClient.invalidateQueries({ queryKey: ['purposeList'] });
    },
  });
};
