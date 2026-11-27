import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  createSubPurpose,
  deleteSubPurpose,
  toReservationStatus,
  updatePurpose,
  updateSubPurpose,
  type PurposeFormValues,
  type SubPurpose,
} from '@entities/purpose';
import { reservationListKey } from '@entities/reservation';

type UpdatePurposeVariables = PurposeFormValues & {
  id: number;
  originalPurpose: string;
  originalSubPurposes: SubPurpose[];
};

export const useUpdatePurpose = () => {
  const queryClient = useQueryClient();

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
      originalPurpose,
      originalSubPurposes,
    }) => {
      const keptIds = new Set(
        subPurposes
          .map((item) => item.serverId)
          .filter((serverId): serverId is number => serverId !== undefined)
      );

      for (const origin of originalSubPurposes) {
        if (!keptIds.has(origin.id)) await deleteSubPurpose(origin.id);
      }

      for (const item of subPurposes) {
        const { serverId } = item;
        if (serverId === undefined) continue;

        const origin = originalSubPurposes.find(({ id }) => id === serverId);
        if (
          origin &&
          origin.name === item.name &&
          origin.reservable === item.reservable
        ) {
          continue;
        }

        await updateSubPurpose(serverId, {
          subPurpose: item.name,
          subPurposeReservation: item.reservable,
        });
      }

      for (const item of subPurposes) {
        if (item.serverId !== undefined) continue;

        await createSubPurpose({
          purpose: originalPurpose,
          reservationStatus: 'SUB_INCLUDE',
          subPurpose: item.name,
          subPurposeReservation: item.reservable,
        });
      }

      await updatePurpose(id, {
        purpose,
        reservationStatus: toReservationStatus(
          subPurposes.length > 0,
          reservationStatus
        ),
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['purposeList'] });
      queryClient.invalidateQueries({ queryKey: reservationListKey });
    },
  });
};
