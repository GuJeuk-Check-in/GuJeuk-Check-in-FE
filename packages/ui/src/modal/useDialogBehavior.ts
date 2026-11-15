import { useEffect, useRef, type KeyboardEvent } from 'react';

const FOCUSABLE_SELECTOR = [
  'button:not(:disabled)',
  'input:not(:disabled)',
  'select:not(:disabled)',
  'textarea:not(:disabled)',
  'a[href]',
  '[tabindex]',
]
  .map((selector) => `${selector}:not([tabindex="-1"])`)
  .join(',');

interface UseDialogBehaviorOptions {
  readonly onClose?: () => void;
  readonly refocusKey?: unknown;
}

export const useDialogBehavior = ({ onClose, refocusKey }: UseDialogBehaviorOptions) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const focusFirst = () => {
    const content = contentRef.current;
    if (!content) return;
    (content.querySelector<HTMLElement>(FOCUSABLE_SELECTOR) ?? content).focus();
  };

  useEffect(() => {
    const previousFocus = document.activeElement;
    focusFirst();
    return () => {
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus();
      }
    };
  }, []);

  useEffect(() => {
    const content = contentRef.current;
    if (content && !content.contains(document.activeElement)) focusFirst();
  }, [refocusKey]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      onClose?.();
      return;
    }
    if (event.key !== 'Tab') return;

    const focusables = contentRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    const first = focusables?.[0];
    const last = focusables?.[focusables.length - 1];
    if (!first || !last) {
      event.preventDefault();
    } else if (event.shiftKey && (document.activeElement === first || document.activeElement === contentRef.current)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return { contentRef, handleKeyDown };
};
