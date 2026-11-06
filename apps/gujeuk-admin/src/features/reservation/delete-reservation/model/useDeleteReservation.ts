import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReservation, reservationListKey } from "@entities/reservation";
import { AxiosError } from "axios";

export const useDeleteReservation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<{ message?: string }>, number>({
    mutationFn: deleteReservation,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: reservationListKey }),
  });
};
