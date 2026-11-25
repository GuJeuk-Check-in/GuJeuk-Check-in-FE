import { Fragment, useEffect, useRef, useState, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { FaCircleCheck, FaCircleExclamation } from 'react-icons/fa6';
import { ColorData } from '@center/tokens';
import clockIcon from '@shared/assets/reservation-clock.png';
import { ReservationCard } from './ReservationCard';
import {
  ReservationCreateModal,
  type ReservationCreateValues,
} from './ReservationCreateModal';
import { ReservationDeleteModal } from './ReservationDeleteModal';
import { ReservationDetailModal } from './ReservationDetailModal';
import {
  TimeData,
  formatDisplayTime,
  formatTimeRange,
  getNextTime,
  type Reservation,
  type ReservationPlace,
  type ReservationTime,
} from './ReservationData';
import { ReservationEmptyCell } from './ReservationEmptyCell';
import { useDeleteReservation } from '@features/reservation/delete-reservation';
import { useCreateReservation } from '@features/reservation/create-reservation';
import { getCreateReservationErrorMessage } from './reservationErrorMessage';
import { ReservationColors } from './reservationColors';

interface CreateTarget {
  place: ReservationPlace;
  time: ReservationTime;
}

interface ReservationTableProps {
  places: ReservationPlace[];
  reservations: Reservation[];
  activeTimeIndex: number;
  readOnly?: boolean;
  toastContainer?: HTMLElement | null;
}

type ToastVariant = 'positive' | 'caution';

interface ToastState {
  message: string;
  variant: ToastVariant;
}

export const ReservationTable = ({
  places,
  reservations,
  activeTimeIndex,
  readOnly = false,
  toastContainer = null,
}: ReservationTableProps) => {
  const [selectedReservationId, setSelectedReservationId] = useState<
    Reservation['id'] | null
  >(null);
  const [detailPosition, setDetailPosition] = useState({ top: 0, left: 0 });
  const [deleteTargetId, setDeleteTargetId] = useState<
    Reservation['id'] | null
  >(null);
  const [createTarget, setCreateTarget] = useState<CreateTarget | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);
  const { mutate: deleteReservation, isPending } = useDeleteReservation();
  const { mutate: createReservation, isPending: isCreating } =
    useCreateReservation();
  const toastTimerRef = useRef<number | null>(null);
  const createEditVersionRef = useRef(0);
  const selectedReservation =
    reservations.find(
      (reservation) => reservation.id === selectedReservationId,
    ) ?? null;
  const deleteTarget =
    reservations.find((reservation) => reservation.id === deleteTargetId) ??
    null;

  useEffect(() => {
    if (selectedReservationId !== null && !selectedReservation) {
      setSelectedReservationId(null);
    }
    if (deleteTargetId !== null && !deleteTarget) {
      setDeleteTargetId(null);
    }
  }, [
    reservations,
    selectedReservationId,
    selectedReservation,
    deleteTargetId,
    deleteTarget,
  ]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showToast = (message: string, variant: ToastVariant = 'positive') => {
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }

    setToast({ message, variant });
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, 2500);
  };

  const handleCreate = (values: ReservationCreateValues) => {
    if (!createTarget || isCreating) return;
    setCreateError(null);
    const editVersion = createEditVersionRef.current;
    const { place, time } = createTarget;

    createReservation(
      {
        name: values.userName,
        phone: values.phone,
        maleCount: values.people.male,
        femaleCount: values.people.female,
        purpose: place,
        startTime: time,
      },
      {
        onSuccess: () => {
          setCreateTarget(null);
          showToast(
            `${values.userName}님의 예약이 추가됐어요 · ${place} ${formatTimeRange(time, getNextTime(time))}`,
          );
        },
        onError: (error) => {
          if (createEditVersionRef.current !== editVersion) return;
          setCreateError(getCreateReservationErrorMessage(error));
        },
      },
    );
  };

  const handleDelete = () => {
    if (!deleteTarget || isPending) return;
    const { userName, place, startTime } = deleteTarget;

    deleteReservation(deleteTarget.id, {
      onSuccess: () => {
        setDeleteTargetId(null);
        setSelectedReservationId(null);
        showToast(
          `${userName}님의 ${place} · ${formatDisplayTime(startTime)} 예약을 삭제했어요`,
        );
      },
      onError: (error) => {
        showToast(
          error.response?.data?.message ||
            '예약을 삭제하지 못했어요. 다시 시도해 주세요.',
          'caution',
        );
      },
    });
  };

  const closeDetail = () => {
    setSelectedReservationId(null);
  };

  const handleReservationClick = (
    reservation: Reservation,
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    if (createTarget || deleteTarget) return;
    if (selectedReservationId === reservation.id) {
      closeDetail();
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const viewportPadding = 16;
    const rootFontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );
    const popoverWidth = Math.min(
      22.5 * rootFontSize,
      window.innerWidth - viewportPadding * 2,
    );
    const popoverHeight = 19.5 * rootFontSize;
    const gap = 8;
    const maxLeft = window.innerWidth - popoverWidth - viewportPadding;
    const preferredLeft =
      rect.right + gap + popoverWidth <= window.innerWidth
        ? rect.right + gap
        : rect.left - gap - popoverWidth;

    const left = Math.min(Math.max(viewportPadding, preferredLeft), maxLeft);

    const top = Math.min(
      Math.max(viewportPadding, rect.top),
      window.innerHeight - popoverHeight - viewportPadding,
    );

    setDetailPosition({ top, left });
    setSelectedReservationId(reservation.id);
  };

  return (
    <>
      <TableGrid $placeCount={places.length}>
        <HeaderCell $column={1} $row={1}>
          <img src={clockIcon} alt='시간' width={32} height={32} />
        </HeaderCell>

        {places.map((place, index) => (
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
              <span>{time}</span>
              <EndTime>~ {getNextTime(time)}</EndTime>
            </TimeCell>

            {places.map((place, placeIndex) => {
              const reservation = reservations.find(
                (item) => item.place === place && item.startTime === time,
              );

              return reservation ? (
                <ReservationCard
                  key={`${time}-${place}`}
                  userName={reservation.userName}
                  place={place}
                  time={time}
                  column={placeIndex + 2}
                  row={timeIndex + 2}
                  readOnly={readOnly}
                  selected={
                    selectedReservationId === reservation.id ||
                    deleteTargetId === reservation.id
                  }
                  onClick={
                    readOnly
                      ? undefined
                      : (event) => handleReservationClick(reservation, event)
                  }
                />
              ) : readOnly ? (
                <ReadOnlyEmptyCell
                  key={`${time}-${place}`}
                  $column={placeIndex + 2}
                  $row={timeIndex + 2}
                  aria-hidden='true'
                />
              ) : (
                <ReservationEmptyCell
                  key={`${time}-${place}`}
                  place={place}
                  time={time}
                  column={placeIndex + 2}
                  row={timeIndex + 2}
                  selected={
                    createTarget?.place === place && createTarget.time === time
                  }
                  onAddClick={(selectedPlace, selectedTime) => {
                    setSelectedReservationId(null);
                    setCreateError(null);
                    setCreateTarget({
                      place: selectedPlace,
                      time: selectedTime,
                    });
                  }}
                />
              );
            })}
          </Fragment>
        ))}
      </TableGrid>

      {selectedReservation && (
        <ReservationDetailModal
          reservation={selectedReservation}
          position={detailPosition}
          onClose={closeDetail}
          onDelete={() => {
            setDeleteTargetId(selectedReservation.id);
            closeDetail();
          }}
        />
      )}

      {deleteTarget && (
        <ReservationDeleteModal
          reservation={deleteTarget}
          onClose={() => {
            if (!isPending) setDeleteTargetId(null);
          }}
          onConfirm={handleDelete}
          isPending={isPending}
        />
      )}

      {createTarget && (
        <ReservationCreateModal
          place={createTarget.place}
          time={createTarget.time}
          onClose={() => {
            if (!isCreating) setCreateTarget(null);
          }}
          onSubmit={handleCreate}
          onEdit={() => {
            createEditVersionRef.current += 1;
            setCreateError(null);
          }}
          isPending={isCreating}
          errorMessage={createError}
        />
      )}

      {toast &&
        toastContainer &&
        createPortal(
          <Toast role='status' aria-live='polite' $variant={toast.variant}>
            {toast.variant === 'positive' ? (
              <FaCircleCheck aria-hidden='true' />
            ) : (
              <FaCircleExclamation aria-hidden='true' />
            )}
            {toast.message}
          </Toast>,
          toastContainer,
        )}
    </>
  );
};

const TableGrid = styled.div<{ $placeCount: number }>`
  --reservation-header-height: 3.75rem;
  --reservation-row-min-height: 2.25rem;
  display: grid;
  height: 100%;
  grid-template-columns: minmax(5.5rem, 0.82fr) repeat(
    ${({ $placeCount }) => $placeCount}, minmax(6rem, 1fr)
  );
  grid-template-rows: var(--reservation-header-height) repeat(
    ${TimeData.length}, minmax(var(--reservation-row-min-height), 1fr)
  );
  min-width: ${({ $placeCount }) =>
    `calc(${5.5 + $placeCount * 6}rem + ${$placeCount}px)`};
  min-height: calc(
    var(--reservation-header-height) +
    ${TimeData.length} * (var(--reservation-row-min-height) + 1px)
  );
  gap: 1px;
  overflow: hidden;
  position: relative;
  border-radius: 0.3rem;
  background-color: ${ReservationColors.boardGridLine};

  > * {
    background-color: ${ColorData.colors.background};
  }
`;

const HeaderCell = styled.div<{
  $column: number;
  $row: number;
}>`
  grid-column: ${({ $column }) => $column};
  grid-row: ${({ $row }) => $row};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
  color: ${ReservationColors.blue};
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  overflow-wrap: anywhere;
`;

const TimeCell = styled.div<{
  $row: number;
  $active: boolean;
}>`
  grid-column: 1;
  grid-row: ${({ $row }) => $row};
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: center;
  justify-content: center;
  color: ${({ $active }) =>
    $active ? ReservationColors.blue : ReservationColors.gray20};
  font-size: 1.0625rem;
  font-weight: 700;
  line-height: 1;
`;

const EndTime = styled.span`
  color: ${ReservationColors.gray20};
  font-size: 0.8125rem;
  font-weight: 600;
`;

const ReadOnlyEmptyCell = styled.div<{ $column: number; $row: number }>`
  grid-column: ${({ $column }) => $column};
  grid-row: ${({ $row }) => $row};
`;

const Toast = styled.div<{ $variant: ToastVariant }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0.5rem 0.875rem;
  border-radius: 0.625rem;
  background-color: ${ColorData.colors.background};
  color: ${ReservationColors.gray40};
  filter: drop-shadow(0 0.5rem 0.75rem rgba(0, 0, 0, 0.2));
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  letter-spacing: -0.025rem;

  svg {
    flex: 0 0 auto;
    width: 1rem;
    height: 1rem;
    color: ${({ $variant }) =>
      $variant === 'caution'
        ? ReservationColors.error
        : ReservationColors.success};
  }
`;
