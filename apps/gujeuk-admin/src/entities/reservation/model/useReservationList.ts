import { useQuery } from "@tanstack/react-query";
import { getReservations } from "../api/reservation.api";

export const reservationListKey = ["reservationList"] as const;

export const useReservationList = (refetchInterval = 30_000) =>
  useQuery({
    queryKey: reservationListKey,
    queryFn: getReservations,
    retry: false,
    refetchInterval,
    staleTime: 1000 * 60 * 5,
  });
    
