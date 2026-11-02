import { useEffect, useId, useRef, type KeyboardEvent } from 'react';
import styled from '@emotion/styled';
import { type ModalConfig } from '@shared/hooks/useModal';
import { Button } from '../button';
import { ColorData } from '../design-system/ColorData';

const FOCUSABLE_ELEMENTS_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ModalProps {
  isOpen: boolean;
  config: ModalConfig | null;
  onClose?: () => void;
}

export const Modal = ({ isOpen, config, onClose }: ModalProps) => {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const subtitleId = useId();

  useEffect(() => {
    if (!isOpen || !config) return;

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
  }, [isOpen, config]);

  if (!isOpen || !config) return null;

  const { icon, title, subtitle, buttons = [], theme = 'default' } = config;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
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
        if (event.target === event.currentTarget) {
          onClose?.();
        }
      }}
    >
      <ModalContent
        ref={modalContentRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={subtitle ? subtitleId : undefined}
        tabIndex={-1}
        $theme={theme}
        data-theme={theme}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <Title id={titleId}>{title}</Title>
        {subtitle && <Subtitle id={subtitleId} $theme={theme}>{subtitle}</Subtitle>}

        {buttons.length > 0 && (
          <ButtonContainer>
            {buttons.map((button, index) => (
              <Button
                key={`${button.label}-${index}`}
                variant={button.variant || 'secondary'}
                onClick={button.onClick}
                bgColor={button.bgColor}
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

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${ColorData.colors.dimmer};
`;

const ModalContent = styled.div<{ $theme?: ModalConfig['theme'] }>`
  width: min(90%, 24rem);
  max-height: calc(100dvh - 2rem);
  box-sizing: border-box;
  overflow-y: auto;
  padding: ${ColorData.spacing[32]};
  border: 2px solid
    ${({ $theme }) =>
      $theme === 'warning'
        ? ColorData.colors.negative
        : $theme === 'info'
          ? ColorData.colors.primary
          : ColorData.colors.lineNormal};
  border-radius: 1.875rem;
  background-color: ${ColorData.colors.background};
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.15);
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
  font-size: 1.375rem;
  font-weight: 700;
  white-space: pre-wrap;
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
  white-space: pre-wrap;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${ColorData.spacing[12]};
  flex-wrap: wrap;
`;
