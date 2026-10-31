import { Fragment, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Toast } from "@shared/ui";
import { ColorData } from "@shared/ui/design-system";
import { ReservationCard } from "./ReservationCard";
import {
  ReservationCreateModal,
  type ReservationCreateValues,
} from "./ReservationCreateModal";
import { ReservationDeleteModal } from "./ReservationDeleteModal";
import { ReservationDetailModal } from "./ReservationDetailModal";
import {
  PlaceData,
  ReservationData,
  TimeData,
  type Reservation,
  type ReservationPlace,
  type ReservationTime,
} from "./ReservationData";
import { ReservationEmptyCell } from "./ReservationEmptyCell";

interface CreateTarget {
  place: ReservationPlace;
  time: ReservationTime;
}

interface ReservationTableProps {
  onAvailabilityChange?: (availability: { inUse: number; available: number }) => void;
}

export const ReservationTable = ({
  onAvailabilityChange,
}: ReservationTableProps) => {
  const [reservations, setReservations] =
    useState<Reservation[]>(ReservationData);
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [detailPosition, setDetailPosition] = useState({ top: 0, left: 0 });
  const [deleteTarget, setDeleteTarget] = useState<Reservation | null>(null);
  const [createTarget, setCreateTarget] = useState<CreateTarget | null>(null);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const activeTimeIndex = getActiveTimeIndex(currentTime);
  const activeTime = activeTimeIndex === -1 ? null : TimeData[activeTimeIndex];
  const inUseCount = activeTime
    ? reservations.filter((reservation) => reservation.startTime === activeTime)
        .length
    : 0;
  const availableCount = Math.max(PlaceData.length - inUseCount, 0);

  useEffect(() => {
    onAvailabilityChange?.({ inUse: inUseCount, available: availableCount });
  }, [availableCount, inUseCount, onAvailabilityChange]);

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(""), 2500);
  };

  const handleCreate = (values: ReservationCreateValues) => {
    if (!createTarget) return;

    const column = PlaceData.indexOf(createTarget.place) + 2;
    const row = TimeData.indexOf(createTarget.time) + 2;
    const reservation: Reservation = {
      id: Date.now(),
      userName: values.userName,
      place: createTarget.place,
      startTime: createTarget.time,
      endTime: getNextTime(createTarget.time),
      people: values.people,
      phone: values.phone,
      column,
      row,
    };

    setReservations((current) => [...current, reservation]);
    setCreateTarget(null);
    showToast(
      `${reservation.userName}님의 ${reservation.place} · ${reservation.startTime} - ${reservation.endTime} 예약이 추가됐어요.`,
    );
  };

  const handleDelete = () => {
    if (!deleteTarget) return;

    setReservations((current) =>
      current.filter((reservation) => reservation.id !== deleteTarget.id),
    );
    setDeleteTarget(null);
    setSelectedReservation(null);
    showToast(
      `${deleteTarget.userName}님의 ${deleteTarget.place} · ${deleteTarget.startTime} - ${deleteTarget.endTime} 예약을 삭제했어요.`,
    );
  };

  return (
    <>
      <TableGrid>
        <HeaderCell $column={1} $row={1}>
          시간
        </HeaderCell>

        {PlaceData.map((place, index) => (
          <HeaderCell key={place} $column={index + 2} $row={1}>
            {place}
          </HeaderCell>
        ))}

        {TimeData.map((time, timeIndex) => (
          <Fragment key={time}>
            <TimeCell
              $row={timeIndex + 2}
              $active={timeIndex === activeTimeIndex}
            >
              {time}
            </TimeCell>

            {PlaceData.map((place, placeIndex) => {
              const reservation = reservations.find(
                (item) => item.place === place && item.startTime === time,
              );

              return reservation ? (
                <OccupiedCell
                  key={`${time}-${place}`}
                  $column={placeIndex + 2}
                  $row={timeIndex + 2}
                />
              ) : (
                <ReservationEmptyCell
                  key={`${time}-${place}`}
                  place={place}
                  time={time}
                  column={placeIndex + 2}
                  row={timeIndex + 2}
                  onAddClick={(selectedPlace, selectedTime) =>
                    setCreateTarget({
                      place: selectedPlace,
                      time: selectedTime,
                    })
                  }
                />
              );
            })}
          </Fragment>
        ))}

        {reservations.map((reservation) => (
          <ReservationCard
            key={reservation.id}
            userName={reservation.userName}
            column={reservation.column}
            row={reservation.row}
            onClick={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              const popoverWidth = 296;
              const popoverHeight = 260;
              const gap = 8;
              const left =
                rect.right + gap + popoverWidth <= window.innerWidth
                  ? rect.right + gap
                  : rect.left - gap - popoverWidth;
              const top = Math.min(
                Math.max(16, rect.top),
                window.innerHeight - popoverHeight - 16,
              );

              setDetailPosition({ top, left: Math.max(16, left) });
              setSelectedReservation(reservation);
            }}
          />
        ))}
      </TableGrid>

      {selectedReservation && (
        <ReservationDetailModal
          reservation={selectedReservation}
          position={detailPosition}
          onClose={() => setSelectedReservation(null)}
          onDelete={() => {
            setDeleteTarget(selectedReservation);
            setSelectedReservation(null);
          }}
        />
      )}

      {deleteTarget && (
        <ReservationDeleteModal
          reservation={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}

      {createTarget && (
        <ReservationCreateModal
          place={createTarget.place}
          time={createTarget.time}
          onClose={() => setCreateTarget(null)}
          onSubmit={handleCreate}
        />
      )}

      {toastMessage && (
        <ToastPosition>
          <Toast>{toastMessage}</Toast>
        </ToastPosition>
      )}
    </>
  );
};

const getNextTime = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  return `${String(hour + 1).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
};

const getActiveTimeIndex = (date: Date) => {
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

const TableGrid = styled.div`
  display: grid;
  grid-template-columns: 5rem repeat(9, minmax(7.5rem, 1fr));
  grid-template-rows: 3.5rem repeat(${TimeData.length}, 4.5rem);
  min-width: 68rem;
  overflow: hidden;
  position: relative;
  border-radius: ${ColorData.radius.modal};
  background-color: ${ColorData.colors.background};
`;

const HeaderCell = styled.div<{ $column: number; $row: number }>`
  grid-column: ${({ $column }) => $column};
  grid-row: ${({ $row }) => $row};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${ColorData.colors.labelNeutral};
  font-size: ${ColorData.typography.caption.fontSize};
  white-space: nowrap;
`;

const TimeCell = styled.div<{ $row: number; $active: boolean }>`
  grid-column: 1;
  grid-row: ${({ $row }) => $row};
  display: flex;
  align-items: center;
  padding-left: ${ColorData.spacing[12]};
  color: ${({ $active }) =>
    $active ? ColorData.colors.primary : ColorData.colors.labelAlternative};
  font-size: ${ColorData.typography.caption.fontSize};
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
`;

const OccupiedCell = styled.div<{ $column: number; $row: number }>`
  grid-column: ${({ $column }) => $column};
  grid-row: ${({ $row }) => $row};
`;

const ToastPosition = styled.div`
  position: fixed;
  right: ${ColorData.spacing[24]};
  bottom: ${ColorData.spacing[24]};
  z-index: 1200;
`;
