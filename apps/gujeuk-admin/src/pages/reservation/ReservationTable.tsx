import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import styled from "@emotion/styled";
import { ColorData } from "@center/tokens";
import { SucceedIcon } from "@shared/assets";
import { ReservationCard } from "./ReservationCard";
import {
  ReservationCreateModal,
  type ReservationCreateValues,
} from "./ReservationCreateModal";
import { ReservationDeleteModal } from "./ReservationDeleteModal";
import { ReservationDetailModal } from "./ReservationDetailModal";
import {
  PlaceData,
  TimeData,
  getNextTime,
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
  reservations: Reservation[];
  activeTimeIndex: number;
  onCreateReservation: (reservation: Reservation) => void;
  onDeleteReservation: (reservation: Reservation) => void;
}

type ToastVariant = "positive" | "caution";

interface ToastState {
  message: string;
  variant: ToastVariant;
}

export const ReservationTable = ({
  reservations,
  activeTimeIndex,
  onCreateReservation,
  onDeleteReservation,
}: ReservationTableProps) => {
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [detailPosition, setDetailPosition] = useState({ top: 0, left: 0 });
  const [deleteTarget, setDeleteTarget] = useState<Reservation | null>(null);
  const [createTarget, setCreateTarget] = useState<CreateTarget | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showToast = (
    message: string,
    variant: ToastVariant = "positive",
  ) => {
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
    if (!createTarget) return;

    const phone = values.phone.trim();
    if (reservations.some((reservation) => reservation.phone === phone)) {
      showToast(
        "이미 예약된 전화번호예요. 예약은 1인 1시간만 가능해요.",
        "caution",
      );
      return;
    }

    const reservation: Reservation = {
      id: Date.now(),
      userName: values.userName,
      place: createTarget.place,
      startTime: createTarget.time,
      people: values.people,
      phone,
    };

    onCreateReservation(reservation);
    setCreateTarget(null);
    showToast(
      `${reservation.userName}님의 ${reservation.place} · ${reservation.startTime} - ${getNextTime(reservation.startTime)} 예약이 추가됐어요.`,
    );
  };

  const handleDelete = () => {
    if (!deleteTarget) return;

    onDeleteReservation(deleteTarget);
    setDeleteTarget(null);
    setSelectedReservation(null);
    showToast(
      `${deleteTarget.userName}님의 ${deleteTarget.place} · ${deleteTarget.startTime} - ${getNextTime(deleteTarget.startTime)} 예약을 삭제했어요.`,
    );
  };

  const handleReservationClick = (
    reservation: Reservation,
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const viewportPadding = 16;
    const rootFontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );
    const popoverWidth = Math.min(
      18.5 * rootFontSize,
      window.innerWidth - viewportPadding * 2,
    );
    const popoverHeight = 282;
    const gap = 8;
    const maxLeft = window.innerWidth - popoverWidth - viewportPadding;
    const preferredLeft =
      rect.right + gap + popoverWidth <= window.innerWidth
        ? rect.right + gap
        : rect.left - gap - popoverWidth;

    const left = Math.min(
      Math.max(viewportPadding, preferredLeft),
      maxLeft,
    );

    const top = Math.min(
      Math.max(viewportPadding, rect.top),
      window.innerHeight - popoverHeight - viewportPadding,
    );

    setDetailPosition({ top, left });
    setSelectedReservation(reservation);
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
                <ReservationCard
                  key={`${time}-${place}`}
                  userName={reservation.userName}
                  place={place}
                  time={time}
                  column={placeIndex + 2}
                  row={timeIndex + 2}
                  onClick={(event) =>
                    handleReservationClick(reservation, event)
                  }
                />
              ) : (
                <ReservationEmptyCell
                  key={`${time}-${place}`}
                  place={place}
                  time={time}
                  column={placeIndex + 2}
                  row={timeIndex + 2}
                  onAddClick={(selectedPlace, selectedTime) => {
                    setSelectedReservation(null);
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

      {toast && (
        <ToastPosition>
          <Toast role="status" aria-live="polite" $variant={toast.variant}>
            {toast.variant === "positive" && (
              <ToastIcon src={SucceedIcon} alt="" />
            )}
            {toast.message}
          </Toast>
        </ToastPosition>
      )}
    </>
  );
};

const TableGrid = styled.div`
  display: grid;
  grid-template-columns: 5rem repeat(9, minmax(7rem, 1fr));
  grid-template-rows: 4.5rem repeat(${TimeData.length}, 8rem);
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

const ToastPosition = styled.div`
  position: fixed;
  right: ${ColorData.spacing[24]};
  bottom: ${ColorData.spacing[24]};
  z-index: 1200;
`;

const Toast = styled.div<{ $variant: ToastVariant }>`
  display: inline-flex;
  align-items: center;
  gap: ${ColorData.spacing[8]};
  min-height: 2.75rem;
  padding: 0 ${ColorData.spacing[16]};
  border-radius: ${ColorData.radius.large};
  border-left: 0.25rem solid
    ${({ $variant }) =>
      $variant === "caution"
        ? ColorData.colors.caution
        : "transparent"};
  background-color: ${ColorData.colors.background};
  color: ${ColorData.colors.labelNormal};
  box-shadow: ${ColorData.shadow.popover};
  font-family: ${ColorData.typography.fontFamily};
  font-size: ${ColorData.typography.caption.fontSize};
`;

const ToastIcon = styled.img`
  display: block;
  width: 1rem;
  height: 1rem;
  flex: 0 0 auto;
  object-fit: contain;
`;
