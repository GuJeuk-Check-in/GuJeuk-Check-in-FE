export const TimeData = [
  "9:30",
  "10:30",
  "11:30",
  "12:30",
  "13:30",
  "14:30",
  "15:30",
  "16:30",
  "17:30",
] as const;

export const PlaceData = [
  "동아리실 1",
  "동아리실 2",
  "음악실",
  "댄스 연습실",
  "다목적실",
  "스터디룸",
  "미디어실",
  "요리실",
  "체육실",
] as const;

export type ReservationTime = (typeof TimeData)[number];
export type ReservationPlace = (typeof PlaceData)[number];

export interface ReservationPeople {
  male: number;
  female: number;
}

export interface Reservation {
  id: number;
  userName: string;
  place: ReservationPlace;
  startTime: ReservationTime;
  people: ReservationPeople;
  phone: string;
}

export const formatPeople = ({ male, female }: ReservationPeople) => {
  const companions = [
    male > 0 ? `남 ${male}` : null,
    female > 0 ? `여 ${female}` : null,
  ].filter(Boolean);

  return companions.length > 0
    ? `본인 + ${companions.join(" · ")}`
    : "본인";
};

export const getNextTime = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  return `${String(hour + 1).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
};

export const getActiveTimeIndex = (date: Date) => {
  const currentMinutes = date.getHours() * 60 + date.getMinutes();

  return TimeData.findIndex((time, index) => {
    const [hour, minute] = time.split(":").map(Number);
    const startMinutes = hour * 60 + minute;
    const nextTime = TimeData[index + 1];
    const endMinutes = nextTime
      ? nextTime.split(":").reduce((total, value, valueIndex) => {
          const number = Number(value);
          return total + (valueIndex === 0 ? number * 60 : number);
        }, 0)
      : startMinutes + 60;

    return currentMinutes >= startMinutes && currentMinutes < endMinutes;
  });
};

export const ReservationData: Reservation[] = [
  {
    id: 1,
    userName: '김정욱',
    place: '동아리실 1',
    startTime: '10:30',
    people: { male: 1, female: 1 },
    phone: '010-1234-5678',
  },
  {
    id: 2,
    userName: '박민건',
    place: '음악실',
    startTime: '9:30',
    people: { male: 2, female: 0 },
    phone: '010-2345-6789',
  },
  {
    id: 3,
    userName: '오혜민',
    place: '요리실',
    startTime: '10:30',
    people: { male: 0, female: 1 },
    phone: '010-3456-7890',
  },
  {
    id: 4,
    userName: '윤지원',
    place: '스터디룸',
    startTime: '11:30',
    people: { male: 1, female: 0 },
    phone: '010-4567-8901',
  },
  {
    id: 5,
    userName: '오은샘',
    place: '동아리실 2',
    startTime: '13:30',
    people: { male: 0, female: 1 },
    phone: '010-5678-9012',
  },
  {
    id: 6,
    userName: '김지우',
    place: '미디어실',
    startTime: '13:30',
    people: { male: 1, female: 0 },
    phone: '010-6789-0123',
  },
  {
    id: 7,
    userName: '바둑이',
    place: '동아리실 1',
    startTime: '14:30',
    people: { male: 0, female: 1 },
    phone: '010-7890-1234',
  },
  {
    id: 8,
    userName: '윤건호',
    place: '음악실',
    startTime: '14:30',
    people: { male: 1, female: 0 },
    phone: '010-8901-2345',
  },
  {
    id: 9,
    userName: '정일웅',
    place: '댄스 연습실',
    startTime: '15:30',
    people: { male: 0, female: 2 },
    phone: '010-9012-3456',
  },
  {
    id: 10,
    userName: '이선우',
    place: '체육실',
    startTime: '15:30',
    people: { male: 2, female: 0 },
    phone: '010-0123-4567',
  },
  {
    id: 11,
    userName: '유예선',
    place: '동아리실 2',
    startTime: '16:30',
    people: { male: 0, female: 1 },
    phone: '010-1234-5678',
  },
  {
    id: 12,
    userName: '최승우',
    place: '미디어실',
    startTime: '16:30',
    people: { male: 1, female: 0 },
    phone: '010-2345-6789',
  },
  {
    id: 13,
    userName: '강건우',
    place: '동아리실 1',
    startTime: '17:30',
    people: { male: 0, female: 1 },
    phone: '010-3456-7890',
  },
  {
    id: 14,
    userName: '김아무개',
    place: '다목적실',
    startTime: '17:30',
    people: { male: 1, female: 0 },
    phone: '010-4567-8901',
  },
];
