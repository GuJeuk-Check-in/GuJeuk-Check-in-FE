import type { ReservationStatus } from './types';

export const isReservableStatus = (status: ReservationStatus) =>
  status === 'RESERVATION';

export const isSubIncludeStatus = (status: ReservationStatus) =>
  status === 'SUB_INCLUDE';

export const toReservationStatus = (
  hasSubPurpose: boolean,
  reservable: boolean
): ReservationStatus => {
  if (hasSubPurpose) return 'SUB_INCLUDE';
  return reservable ? 'RESERVATION' : 'NONE';
};
