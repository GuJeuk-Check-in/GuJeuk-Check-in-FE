import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
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
  TimeData,
  type Reservation,
  type ReservationPlace,
  type ReservationTime,
} from "./ReservationData";
import { ReservationEmptyCell } from "./ReservationEmptyCell";
import { useDeleteReservation } from "@features/reservation/delete-reservation";
import { useCreateReservation } from "@features/reservation/create-reservation";
import { getCreateReservationErrorMessage } from "./reservationErrorMessage";

interface CreateTarget {
  place: ReservationPlace;
  time: ReservationTime;
}

interface ReservationTableProps {
  places: ReservationPlace[];
  reservations: Reservation[];
  activeTimeIndex: number;
}

type ToastVariant = "positive" | "caution";

interface ToastState {
  message: string;
  variant: ToastVariant;
}

export const ReservationTable = ({
  places,
  reservations,
  activeTimeIndex,
}: ReservationTableProps) => {
  const [selectedReservationId, setSelectedReservationId] = useState<
    Reservation["id"] | null
  >(null);
  const [detailPosition, setDetailPosition] = useState({ top: 0, left: 0 });
  const [detailAutoFocus, setDetailAutoFocus] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<
    Reservation["id"] | null
  >(null);
  const [createTarget, setCreateTarget] = useState<CreateTarget | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);
  const { mutate: deleteReservation, isPending } = useDeleteReservation();
  const { mutate: createReservation, isPending: isCreating } =
    useCreateReservation();
  const toastTimerRef = useRef<number | null>(null);
  const createEditVersionRef = useRef(0);
  const detailCloseTimerRef = useRef<number | null>(null);
  const detailHasFocusRef = useRef(false);
  const detailPointerInsideRef = useRef(false);
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
      if (detailCloseTimerRef.current !== null) {
        window.clearTimeout(detailCloseTimerRef.current);
      }
    };
  }, []);

  const showToast = (message: string, variant: ToastVariant = "positive") => {
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

    createReservation(
      {
        name: values.userName,
        phone: values.phone,
        maleCount: values.people.male,
        femaleCount: values.people.female,
        purpose: createTarget.place,
        startTime: createTarget.time,
      },
      {
        onSuccess: () => {
          setCreateTarget(null);
          showToast(`${values.userName}님의 예약이 추가됐어요.`);
        },
        onError: (error) => {
          // 요청 뒤에 입력을 고쳤다면 이전 입력의 오류이므로 띄우지 않음
          if (createEditVersionRef.current !== editVersion) return;
          setCreateError(getCreateReservationErrorMessage(error));
        },
      },
    );
  };

  const handleDelete = () => {
    if (!deleteTarget || isPending) return;

    deleteReservation(deleteTarget.id, {
      onSuccess: () => {
        setDeleteTargetId(null);
        setSelectedReservationId(null);
        showToast("예약을 삭제했어요");
      },
      onError: (error) => {
        showToast(
          error.response?.data?.message ||
            "예약을 삭제하지 못했어요. 다시 시도해 주세요.",
          "caution",
        );
      },
    });
  };

  const cancelDetailClose = () => {
    if (detailCloseTimerRef.current !== null) {
      window.clearTimeout(detailCloseTimerRef.current);
      detailCloseTimerRef.current = null;
    }
  };

  const scheduleDetailClose = () => {
    cancelDetailClose();
    detailCloseTimerRef.current = window.setTimeout(() => {
      detailCloseTimerRef.current = null;
      if (detailHasFocusRef.current) return;
      setSelectedReservationId(null);
      detailPointerInsideRef.current = false;
    }, 200);
  };

  const handleDetailPointerEnter = () => {
    detailPointerInsideRef.current = true;
    cancelDetailClose();
  };

  const handleDetailPointerLeave = () => {
    detailPointerInsideRef.current = false;
    scheduleDetailClose();
  };

  const handleDetailBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (
      event.relatedTarget instanceof Node &&
      event.currentTarget.contains(event.relatedTarget)
    ) {
      return;
    }

    detailHasFocusRef.current = false;
    if (detailPointerInsideRef.current) {
      cancelDetailClose();
      return;
    }

    cancelDetailClose();
    setSelectedReservationId(null);
  };

  const closeDetail = () => {
    cancelDetailClose();
    detailHasFocusRef.current = false;
    detailPointerInsideRef.current = false;
    setSelectedReservationId(null);
  };

  const handleReservationClick = (
    reservation: Reservation,
    event: MouseEvent<HTMLButtonElement>,
    autoFocus: boolean,
  ) => {
    if (createTarget || deleteTarget) return;
    cancelDetailClose();
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

    const left = Math.min(Math.max(viewportPadding, preferredLeft), maxLeft);

    const top = Math.min(
      Math.max(viewportPadding, rect.top),
      window.innerHeight - popoverHeight - viewportPadding,
    );

    setDetailPosition({ top, left });
    setDetailAutoFocus(autoFocus);
    setSelectedReservationId(reservation.id);
  };

  return (
    <>
      <TableGrid $placeCount={places.length}>
        <HeaderCell $column={1} $row={1}>
          시간
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
              {time}
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
                  onClick={(event) =>
                    handleReservationClick(reservation, event, true)
                  }
                  onMouseEnter={(event) => {
                    if (createTarget || deleteTarget) return;
                    detailPointerInsideRef.current = true;
                    handleReservationClick(reservation, event, false);
                  }}
                  onMouseLeave={handleDetailPointerLeave}
                />
              ) : (
                <ReservationEmptyCell
                  key={`${time}-${place}`}
                  place={place}
                  time={time}
                  column={placeIndex + 2}
                  row={timeIndex + 2}
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
          autoFocus={detailAutoFocus}
          onMouseEnter={handleDetailPointerEnter}
          onMouseLeave={handleDetailPointerLeave}
          onFocus={() => {
            detailHasFocusRef.current = true;
          }}
          onBlur={handleDetailBlur}
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

const TableGrid = styled.div<{ $placeCount: number }>`
  display: grid;
  grid-template-columns: 5rem repeat(${({ $placeCount }) => $placeCount}, minmax(7rem, 1fr));
  grid-template-rows: 4.5rem repeat(${TimeData.length}, 5rem);
  min-width: ${({ $placeCount }) => 5 + $placeCount * 7}rem;
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
  z-index: 10001;
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
      $variant === "caution" ? ColorData.colors.caution : "transparent"};
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
