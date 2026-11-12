import { useEffect, type ReactNode } from "react";
import styled from "@emotion/styled";
import { ColorData } from "@center/tokens";
import { useDialogFocusTrap } from "@shared/hooks/useDialogFocusTrap";

interface ReservationDialogProps {
  labelledBy: string;
  describedBy?: string;
  closable: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const ReservationDialog = ({
  labelledBy,
  describedBy,
  closable,
  onClose,
  children,
}: ReservationDialogProps) => {
  const dialogRef = useDialogFocusTrap(true);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && closable) onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closable, onClose]);

  return (
    <Overlay
      onClick={(event) => {
        if (event.target === event.currentTarget && closable) onClose();
      }}
    >
      <Dialog
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        tabIndex={-1}
      >
        {children}
      </Dialog>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Dialog = styled.div`
  width: min(calc(100% - 2rem), 30rem);
  max-height: calc(100dvh - 2rem);
  box-sizing: border-box;
  overflow-y: auto;
  padding: 2rem 2rem 1.75rem;
  border-radius: 1.25rem;
  background-color: ${ColorData.colors.background};
  box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.2);
  font-family: ${ColorData.typography.fontFamily};
  text-align: left;
  outline: none;
`;
