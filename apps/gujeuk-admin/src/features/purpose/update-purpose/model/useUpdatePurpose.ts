import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  createSubPurpose,
  deleteSubPurpose,
  isSubIncludeStatus,
  toReservationStatus,
  updatePurpose,
  usePurposeStore,
  type PurposeFormValues,
  type ReservationStatus,
} from '@entities/purpose';
import { reservationListKey } from '@entities/reservation';

type UpdatePurposeVariables = PurposeFormValues & {
  id: number;
  originalPurpose: string;
  originalReservationStatus: ReservationStatus;
};

export const useUpdatePurpose = () => {
  const queryClient = useQueryClient();
  const updateLocalPurpose = usePurposeStore((state) => state.updatePurpose);
  const setSubPurposes = usePurposeStore((state) => state.setSubPurposes);

  return useMutation<
    void,
    AxiosError<{ message?: string }>,
    UpdatePurposeVariables
  >({
    mutationFn: async ({
      id,
      purpose,
      reservationStatus,
      subPurposes,
      removedSubPurposeIds,
      originalPurpose,
      originalReservationStatus,
    }) => {
      for (const removedId of removedSubPurposeIds) {
        await deleteSubPurpose(removedId);
      }

      const addedSubPurposes = subPurposes.filter((item) => !item.isSaved);

      for (const subPurpose of addedSubPurposes) {
        await createSubPurpose({
          purpose: originalPurpose,
          reservationStatus: 'SUB_INCLUDE',
          subPurpose: subPurpose.name,
          subPurposeReservation: subPurpose.reservable,
        });
      }

      const hasSubPurpose =
        subPurposes.length > 0 ||
        (isSubIncludeStatus(originalReservationStatus) &&
          !removedSubPurposeIds.length);

      await updatePurpose(id, {
        purpose,
        reservationStatus: toReservationStatus(
          hasSubPurpose,
          reservationStatus
        ),
      });
    },
    onSuccess: (_, variables) => {
      updateLocalPurpose(variables.id, variables.purpose);
      setSubPurposes(
        variables.id,
        variables.subPurposes.map((item) => ({ ...item, isSaved: true }))
      );
      queryClient.invalidateQueries({ queryKey: ['purposeList'] });
      queryClient.invalidateQueries({ queryKey: reservationListKey });
    },
  });
};
