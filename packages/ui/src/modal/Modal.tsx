import { adminTokens } from '@center/tokens';
import styled from '@emotion/styled';
import { useEffect, useId, useRef, type KeyboardEvent } from 'react';
import { type ModalConfig } from './types';

interface ModalProps {
  isOpen: boolean;
  config: ModalConfig | null;
  onClose?: () => void;
}

export const Modal = ({ isOpen, config, onClose }: ModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const subtitleId = useId();
  const hasConfig = config !== null;

  useEffect(() => {
    if (!isOpen || !hasConfig) return;
    const previousFocus = document.activeElement;
    const content = contentRef.current;
    (content?.querySelector<HTMLButtonElement>('button') ?? content)?.focus();

    return () => {
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus();
      }
    };
  }, [isOpen, hasConfig]);

  useEffect(() => {
    if (!isOpen || !config) return;
    const content = contentRef.current;
    if (content && !content.contains(document.activeElement)) {
      (content.querySelector<HTMLButtonElement>('button') ?? content).focus();
    }
  }, [isOpen, config]);

  if (!isOpen || !config) return null;

  const { icon, title, subtitle, buttons = [], theme = 'default' } = config;

  const handleButtonClick = (onClick?: () => void) => {
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      onClose?.();
    }
    if (event.key !== 'Tab') return;
    const buttons = contentRef.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)');
    const first = buttons?.[0];
    const last = buttons?.[buttons.length - 1];
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

  return (
    <Overlay onClick={onClose}>
      <ModalContent
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={subtitleId}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        $theme={theme}
        data-theme={theme}
      >
        {icon && <IconWrapper>{icon}</IconWrapper>}

        <Title id={titleId}>{title}</Title>
        <Subtitle id={subtitleId}>{subtitle}</Subtitle>

        <ButtonContainer>
          {buttons.map((btn, idx) => (
            <Button
              type="button"
              key={idx}
              onClick={() => handleButtonClick(btn.onClick)}
              $variant={btn.variant || 'secondary'}
              style={{ backgroundColor: btn.bgColor }}
            >
              {btn.label}
            </Button>
          ))}
        </ButtonContainer>
      </ModalContent>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

const ModalContent = styled.div<{ $theme?: string }>`
  border-radius: 1.875rem;
  background-color: white;
  padding: 2rem;
  width: 90%;
  max-width: 24rem;
  text-align: center;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.15);
  animation: slideUp 0.3s ease-out;
  max-height: calc(100dvh - 2rem);
  overflow-y: auto;

  @media (max-width: 32rem) {
    box-sizing: border-box;
    width: calc(100% - 2rem);
    padding: 1.5rem;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  border: ${(props) => {
    switch (props.$theme) {
      case 'warning':
        return `2px solid ${adminTokens(props.theme).colors.warning}`;
      case 'info':
        return `2px solid ${adminTokens(props.theme).colors.primary}`;
      default:
        return '2px solid #d1d5db';
    }
  }};

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

const Title = styled.h2`
  font-size: 1.375rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 0.5rem;
  white-space: pre-wrap;
  word-break: keep-all;
  overflow-wrap: anywhere;
`;

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #ef4444;
  margin-bottom: 2rem;
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
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 0.625rem 2rem;
  border-radius: 1.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 6rem;

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
    } else {
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
    }
  }}
`;
