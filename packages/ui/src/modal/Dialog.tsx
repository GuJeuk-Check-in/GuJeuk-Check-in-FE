import styled from '@emotion/styled';
import type { HTMLAttributes } from 'react';
import { useDialogBehavior } from './useDialogBehavior';

interface DialogProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onKeyDown' | 'onClick'> {
  readonly onClose?: () => void;
  readonly refocusKey?: unknown;
}

export const Dialog = ({ onClose, refocusKey, children, ...contentProps }: DialogProps) => {
  const { contentRef, handleKeyDown } = useDialogBehavior({ onClose, refocusKey });

  return (
    <Overlay onClick={onClose}>
      <div
        {...contentProps}
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
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
  background-color: rgba(0, 0, 0, 0.5);
`;
