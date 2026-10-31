import { useEffect, useRef, type KeyboardEvent, type ReactNode } from 'react';
import styled from '@emotion/styled';
import { type ModalConfig } from '@shared/hooks/useModal';
import { Button } from '../button';
import { ColorData } from '../design-system/ColorData';

const FOCUSABLE_ELEMENTS_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ModalProps {
  isOpen: boolean;
  config: ModalConfig | null;
  children?: ReactNode;
  onClose?: () => void;
  titleExtra?: ReactNode;
  size?: 'default' | 'compact';
  mode?: 'dialog' | 'popover';
  position?: { top: number; left: number };
}

export const Modal = ({
  isOpen,
  config,
  children,
  onClose,
  titleExtra,
  size = 'default',
  mode = 'dialog',
  position,
}: ModalProps) => {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const isDialogOpen = isOpen && config !== null && mode === 'dialog';

  useEffect(() => {
    if (!isDialogOpen) return;

    const previouslyFocusedElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const modalContent = modalContentRef.current;
    if (!modalContent) return;

    const focusableElements = Array.from(
      modalContent.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS_SELECTOR),
    ).filter((element) => element.getClientRects().length > 0);

    (focusableElements[0] ?? modalContent).focus();

    return () => {
      previouslyFocusedElement?.focus();
    };
  }, [isDialogOpen]);

  if (!isOpen || !config) return null;

  const { icon, title, subtitle, buttons = [], theme = 'default' } = config;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (mode !== 'dialog') return;

    if (event.key === 'Escape') {
      event.preventDefault();
      onClose?.();
      return;
    }

    if (event.key !== 'Tab') return;

    const modalContent = modalContentRef.current;
    if (!modalContent) return;

    const focusableElements = Array.from(
      modalContent.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS_SELECTOR),
    ).filter((element) => element.getClientRects().length > 0);

    if (focusableElements.length === 0) {
      event.preventDefault();
      modalContent.focus();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey && (activeElement === firstElement || !modalContent.contains(activeElement))) {
      event.preventDefault();
      lastElement.focus();
    } else if (
      !event.shiftKey &&
      (activeElement === lastElement || !modalContent.contains(activeElement))
    ) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  return (
    <Overlay
      onClick={(event) => {
        if (mode === 'dialog' && event.target === event.currentTarget) {
          onClose?.();
        }
      }}
      $mode={mode}
    >
      <ModalContent
        ref={modalContentRef}
        role="dialog"
        aria-modal={mode === 'dialog' ? true : undefined}
        aria-labelledby="common-modal-title"
        tabIndex={-1}
        $theme={theme}
        $size={size}
        $mode={mode}
        $top={position?.top}
        $left={position?.left}
        data-theme={theme}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {onClose && (
          <CloseButton type="button" onClick={onClose} aria-label="모달 닫기">
            ×
          </CloseButton>
        )}
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <TitleRow>
          <Title id="common-modal-title">{title}</Title>
          {titleExtra}
        </TitleRow>
        {subtitle && <Subtitle $theme={theme}>{subtitle}</Subtitle>}
        {children}

        {buttons.length > 0 && (
          <ButtonContainer>
            {buttons.map((button, index) => (
              <Button
                key={`${button.label}-${index}`}
                variant={button.variant === 'primary' ? 'danger' : 'secondary'}
                size={size === 'compact' ? 'small' : 'medium'}
                onClick={button.onClick}
              >
                {button.label}
              </Button>
            ))}
          </ButtonContainer>
        )}
      </ModalContent>
    </Overlay>
  );
};

const Overlay = styled.div<{ $mode: 'dialog' | 'popover' }>`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: ${({ $mode }) => ($mode === 'dialog' ? 'center' : 'flex-start')};
  justify-content: ${({ $mode }) => ($mode === 'dialog' ? 'center' : 'flex-start')};
  padding: ${({ $mode }) => ($mode === 'dialog' ? ColorData.spacing[16] : '0')};
  background-color: ${({ $mode }) =>
    $mode === 'dialog' ? ColorData.colors.dimmer : 'transparent'};
  pointer-events: ${({ $mode }) => ($mode === 'popover' ? 'none' : 'auto')};
`;

const ModalContent = styled.div<{
  $theme?: ModalConfig['theme'];
  $size: 'default' | 'compact';
  $mode: 'dialog' | 'popover';
  $top?: number;
  $left?: number;
}>`
  position: ${({ $mode }) => ($mode === 'popover' ? 'fixed' : 'relative')};
  top: ${({ $top }) => ($top === undefined ? 'auto' : `${$top}px`)};
  left: ${({ $left }) => ($left === undefined ? 'auto' : `${$left}px`)};
  pointer-events: auto;
  width: ${({ $size }) => ($size === 'compact' ? '18.5rem' : 'min(90%, 24rem)')};
  max-height: calc(100dvh - 2rem);
  overflow-y: auto;
  padding: ${({ $size }) => ($size === 'compact' ? ColorData.spacing[16] : ColorData.spacing[24])};
  border: ${({ $size }) => ($size === 'compact' ? '1px' : '2px')} solid
    ${({ $theme }) =>
      $theme === 'warning'
        ? ColorData.colors.negative
        : $theme === 'info'
          ? ColorData.colors.primary
          : ColorData.colors.lineNormal};
  border-radius: ${ColorData.radius.modal};
  background-color: ${ColorData.colors.background};
  box-shadow: ${ColorData.shadow.modal};
  text-align: center;
  animation: modalEnter ${ColorData.interaction.transitionNormal};

  @keyframes modalEnter {
    from {
      opacity: 0;
      transform: translateY(0.75rem) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${ColorData.spacing[16]};
`;

const Title = styled.h2`
  margin: 0 0 ${ColorData.spacing[8]};
  color: ${ColorData.colors.labelNormal};
  font-size: 1.125rem;
  font-weight: 700;
  text-align: left;
  white-space: pre-wrap;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${ColorData.spacing[8]};
`;

const Subtitle = styled.p<{ $theme?: ModalConfig['theme'] }>`
  margin: 0 0 ${ColorData.spacing[24]};
  color: ${({ $theme }) =>
    $theme === 'warning'
      ? ColorData.colors.negative
      : $theme === 'info'
        ? ColorData.colors.primary
        : ColorData.colors.labelAlternative};
  font-size: ${ColorData.typography.body.fontSize};
  text-align: left;
  white-space: pre-wrap;
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${ColorData.spacing[16]};
  right: ${ColorData.spacing[16]};
  width: 1.75rem;
  height: 1.75rem;
  border: 0;
  border-radius: 50%;
  background-color: ${ColorData.colors.fillNormal};
  color: ${ColorData.colors.labelAlternative};
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;

  &:hover {
    background-color: ${ColorData.colors.lineAlternative};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${ColorData.spacing[12]};
  margin-top: ${ColorData.spacing[24]};
  flex-wrap: wrap;
`;
