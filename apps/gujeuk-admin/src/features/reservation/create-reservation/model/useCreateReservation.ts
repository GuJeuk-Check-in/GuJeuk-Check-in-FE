import { createReservation, reservationListKey } from '@entities/reservation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateReservation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createReservation,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: reservationListKey }),
  });
};
