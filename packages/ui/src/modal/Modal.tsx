import { adminTokens } from '@center/tokens';
import styled from '@emotion/styled';
import {
  useEffect,
  useId,
  useRef,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { type ModalConfig } from './types';

const FOCUSABLE_ELEMENTS_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ModalProps {
  isOpen: boolean;
  config: ModalConfig | null;
  onClose?: () => void;
  children?: ReactNode;
  size?: 'default' | 'compact' | 'large';
  showCloseButton?: boolean;
}

export const Modal = ({
  isOpen,
  config,
  children,
  onClose,
  size = 'default',
  showCloseButton = false,
}: ModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const subtitleId = useId();

  useEffect(() => {
    if (!isOpen || !config) return;

    const previousFocus = document.activeElement;
    const content = contentRef.current;
    if (!content) return;

    const focusableElements = Array.from(
      content.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS_SELECTOR),
    ).filter((element) => element.getClientRects().length > 0);

    (focusableElements[0] ?? content).focus();

    return () => {
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus();
      }
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

    const content = contentRef.current;
    if (!content) return;

    const focusableElements = Array.from(
      content.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS_SELECTOR),
    ).filter((element) => element.getClientRects().length > 0);

    if (focusableElements.length === 0) {
      event.preventDefault();
      content.focus();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey && (activeElement === firstElement || !content.contains(activeElement))) {
      event.preventDefault();
      lastElement.focus();
    } else if (
      !event.shiftKey &&
      (activeElement === lastElement || !content.contains(activeElement))
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
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={subtitle ? subtitleId : undefined}
        tabIndex={-1}
        $theme={theme}
        $size={size}
        data-theme={theme}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {showCloseButton && onClose && (
          <CloseButton type="button" onClick={onClose} aria-label="모달 닫기">
            ×
          </CloseButton>
        )}
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <Title id={titleId} $size={size}>{title}</Title>
        {subtitle && (
          <Subtitle id={subtitleId} $size={size}>
            {subtitle}
          </Subtitle>
        )}
        {children}

        {buttons.length > 0 && (
          <ButtonContainer>
            {buttons.map((button, index) => (
              <Button
                type="button"
                key={`${button.label}-${index}`}
                onClick={button.onClick}
                $variant={button.variant || 'secondary'}
                style={{ backgroundColor: button.bgColor }}
              >
                {button.icon}
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
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div<{
  $theme?: string;
  $size: 'default' | 'compact' | 'large';
}>`
  width: ${({ $size }) =>
    $size === 'compact'
      ? 'min(90%, 20.625rem)'
      : $size === 'large'
        ? 'min(90%, 30rem)'
        : 'min(90%, 24rem)'};
  max-height: calc(100dvh - 2rem);
  position: relative;
  box-sizing: border-box;
  overflow-y: auto;
  padding: ${({ $size }) =>
    $size === 'compact' ? '1.5rem' : $size === 'large' ? '2.5rem' : '2rem'};
  border: ${(props) => {
    const borderWidth = props.$size === 'compact' ? '1px' : '2px';

    switch (props.$theme) {
      case 'warning':
        return `${borderWidth} solid ${adminTokens(props.theme).colors.warning}`;
      case 'info':
        return `${borderWidth} solid ${adminTokens(props.theme).colors.primary}`;
      default:
        return `${borderWidth} solid #d1d5db`;
    }
  }};
  border-radius: ${({ $size }) => ($size === 'compact' ? '1rem' : '1.875rem')};
  background-color: white;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.15);
  text-align: center;
  animation: slideUp 0.3s ease-out;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(1rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;

  svg {
    width: 3rem;
    height: 3rem;

    color: ${({ theme }) => adminTokens(theme).colors.warning};

    [data-theme='info'] & {
      color: ${({ theme }) => adminTokens(theme).colors.primary};
    }

    [data-theme='default'] & {
      color: #1f2937;
    }
  }
`;

const Title = styled.h2<{ $size: 'default' | 'compact' | 'large' }>`
  margin: 0 0 0.5rem;
  color: #1f2937;
  font-size: ${({ $size }) =>
    $size === 'compact' ? '1.125rem' : $size === 'large' ? '1.5rem' : '1.375rem'};
  font-weight: bold;
  text-align: ${({ $size }) => ($size === 'compact' ? 'left' : 'center')};
  white-space: pre-wrap;
  word-break: keep-all;
  overflow-wrap: anywhere;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 1.75rem;
  height: 1.75rem;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: #6b7280;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const Subtitle = styled.p<{ $size: 'default' | 'compact' | 'large' }>`
  margin: 0 0 2rem;
  color: #ef4444;
  font-size: 0.875rem;
  text-align: ${({ $size }) => ($size === 'compact' ? 'left' : 'center')};
  white-space: pre-wrap;

  [data-theme='info'] & {
    color: ${({ theme }) => adminTokens(theme).colors.primary};
  }

  [data-theme='default'] & {
    color: #6b7280;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  min-width: 6rem;
  padding: 0.625rem 2rem;
  border: none;
  border-radius: 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) => {
    if (props.$variant === 'primary') {
      return `
        background-color: ${adminTokens(props.theme).colors.warning};
        color: white;

        &:hover {
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
        }

        &:active {
          transform: translateY(0);
        }
      `;
    }

    return `
      background-color: white;
      color: #6b7280;
      border: 2px solid #d1d5db;

      &:hover {
        background-color: #f9fafb;
        border-color: #9ca3af;
      }

      &:active {
        background-color: #f3f4f6;
      }
    `;
  }}
`;
