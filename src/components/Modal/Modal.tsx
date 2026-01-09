import styled from '@emotion/styled';
import { type ModalConfig } from '../../hooks/useModal';
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  config: ModalConfig | null;
  onClose: () => void;
}

export const Modal = ({ isOpen, config, onClose }: ModalProps) => {
  if (!isOpen || !config) return null;

  const { icon, title, subtitle, buttons = [], theme = 'default' } = config;

  const handleButtonClick = (onClick?: () => void) => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContent
        onClick={(e) => e.stopPropagation()}
        $theme={theme}
        data-theme={theme}
      >
        {icon && <IconWrapper>{icon}</IconWrapper>}

        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>

        <ButtonContainer>
          {buttons.map((btn, idx) => (
            <Button
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

  border: ${(props) => {
    switch (props.$theme) {
      case 'warning':
        return '2px solid #D88282';
      case 'info':
        return '2px solid #0F50A0';
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

    color: #d88282;

    [data-theme='info'] & {
      color: #0f50a0;
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
`;

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #ef4444;
  margin-bottom: 2rem;
  white-space: pre-wrap;

  [data-theme='info'] & {
    color: #0f50a0;
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
        background-color: #D88282; 
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
