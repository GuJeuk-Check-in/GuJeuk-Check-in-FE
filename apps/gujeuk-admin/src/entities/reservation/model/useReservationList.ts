import { useQuery } from "@tanstack/react-query";
import { getReservations } from "../api/reservation.api";

export const reservationListKey = ["reservationList"] as const;

export const useReservationList = () =>
  useQuery({
    queryKey: reservationListKey,
    queryFn: getReservations,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
