import { adminTokens } from '@center/tokens';
import styled from '@emotion/styled';
import { useEffect, useId, useRef, type ReactNode } from 'react';
import { type ModalConfig } from '../modal/types';

const FOCUSABLE_ELEMENTS_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface PopoverProps {
  isOpen: boolean;
  config: ModalConfig | null;
  position: { top: number; left: number };
  children?: ReactNode;
  onClose?: () => void;
  titleExtra?: ReactNode;
  autoFocus?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const Popover = ({
  isOpen,
  config,
  position,
  children,
  onClose,
  titleExtra,
  autoFocus = true,
  onMouseEnter,
  onMouseLeave,
}: PopoverProps) => {
  const titleId = useId();
  const subtitleId = useId();
  const contentRef = useRef<HTMLDivElement>(null);
  const hasConfig = config !== null;

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !hasConfig || !autoFocus) return;

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
  }, [isOpen, hasConfig, autoFocus]);

  if (!isOpen || !config) return null;

  const { icon, title, subtitle, buttons = [], theme = 'default' } = config;

  return (
    <PopoverLayer>
      <PopoverContent
        ref={contentRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        role="dialog"
        aria-labelledby={titleId}
        aria-describedby={subtitle ? subtitleId : undefined}
        tabIndex={-1}
        data-theme={theme}
        $theme={theme}
        $top={position.top}
        $left={position.left}
      >
        {onClose && (
          <CloseButton type="button" onClick={onClose} aria-label="팝오버 닫기">
            ×
          </CloseButton>
        )}
        {icon && <IconWrapper>{icon}</IconWrapper>}

        <TitleRow>
          <Title id={titleId}>{title}</Title>
          {titleExtra}
        </TitleRow>
        {subtitle && <Subtitle id={subtitleId}>{subtitle}</Subtitle>}
        {children}

        {buttons.length > 0 && (
          <ButtonContainer>
            {buttons.map((button, index) => (
              <Button
                key={`${button.label}-${index}`}
                type="button"
                $variant={button.variant || 'secondary'}
                style={{ backgroundColor: button.bgColor }}
                onClick={button.onClick}
              >
                {button.icon}
                {button.label}
              </Button>
            ))}
          </ButtonContainer>
        )}
      </PopoverContent>
    </PopoverLayer>
  );
};

const PopoverLayer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  pointer-events: none;
`;

const PopoverContent = styled.div<{
  $theme?: ModalConfig['theme'];
  $top: number;
  $left: number;
}>`
  position: fixed;
  top: ${({ $top }) => `${$top}px`};
  left: ${({ $left }) => `${$left}px`};
  width: 18.5rem;
  max-height: calc(100dvh - 2rem);
  max-width: calc(100vw - 2rem);
  box-sizing: border-box;
  overflow-y: auto;
  padding: 1rem;
  border: 1px solid
    ${({ $theme }) =>
      $theme === 'warning'
        ? '#D88282'
        : $theme === 'info'
          ? adminTokens({}).colors.primary
          : '#d1d5db'};
  border-radius: 1rem;
  background-color: white;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.15);
  text-align: center;
  pointer-events: auto;
  animation: popoverEnter 0.2s ease-out;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @keyframes popoverEnter {
    from {
      opacity: 0;
      transform: translateY(0.5rem) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
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
  font-size: 1.75rem;
  line-height: 1;
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  text-align: left;
`;

const Title = styled.h2`
  margin: 0 0 0.5rem;
  color: #1f2937;
  font-size: 1.125rem;
  font-weight: 700;
  white-space: pre-wrap;
`;

const Subtitle = styled.p`
  margin: 0 0 1.5rem;
  color: #6b7280;
  font-size: 0.875rem;
  text-align: left;
  white-space: pre-wrap;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  display: inline-flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  min-width: 0;
  padding: 0.625rem 0.75rem;
  border: none;
  border-radius: 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) =>
    props.$variant === 'primary'
      ? `
          background-color: ${adminTokens(props.theme).colors.warning};
          color: white;
        `
      : `
          background-color: #f3f4f6;
          color: #6b7280;
        `}
`;
