import type { ReservationResponse } from "@entities/reservation";

export const TimeData = [
  "09:30",
  "10:30",
  "11:30",
  "12:30",
  "13:30",
  "14:30",
  "15:30",
  "16:30",
  "17:30",
  "18:30",
] as const;

export type ReservationTime = (typeof TimeData)[number];
export type ReservationPlace = string;

export interface ReservationPeople {
  male: number;
  female: number;
}

export interface Reservation {
  id: number;
  userName: string;
  place: ReservationPlace;
  startTime: string;
  endTime: string;
  people: ReservationPeople;
  phone: string;
}

const toMinutes = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
};

export const toReservationTime = (time: string) => time.slice(0, 5);

export const toReservation = (response: ReservationResponse): Reservation => ({
  id: response.id,
  userName: response.name,
  place: response.purpose,
  startTime: toReservationTime(response.startTime),
  endTime: toReservationTime(response.endTime),
  people: { male: response.maleCount, female: response.femaleCount },
  phone: response.phone,
});

export const formatPeople = ({ male, female }: ReservationPeople) => {
  const companions = [
    male > 0 ? `남 ${male}` : null,
    female > 0 ? `여 ${female}` : null,
  ].filter(Boolean);

  return companions.length > 0 ? companions.join(" · ") : "없음";
};

export const formatDisplayTime = (time: string) => time.replace(/^0/, "");

export const formatTimeRange = (startTime: string, endTime: string) =>
  `${formatDisplayTime(startTime)} – ${formatDisplayTime(endTime)}`;

export const getNextTime = (time: string) => {
  const nextMinutes = (toMinutes(time) + 60) % (24 * 60);
  const hour = Math.floor(nextMinutes / 60);
  const minute = nextMinutes % 60;

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
};

export const getActiveTimeIndex = (date: Date) => {
  const currentMinutes = date.getHours() * 60 + date.getMinutes();

  return TimeData.findIndex((time) => {
    const startMinutes = toMinutes(time);
    return currentMinutes >= startMinutes && currentMinutes < startMinutes + 60;
  });
};
