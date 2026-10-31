import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import { SucceedIcon } from '@shared/assets';
import { ColorData } from '../design-system/ColorData';

interface ToastProps {
  children: ReactNode;
  variant?: 'positive' | 'caution' | 'negative';
}

export const Toast = ({ children, variant = 'positive' }: ToastProps) => (
  <ToastBox $variant={variant} role="status" aria-live="polite">
    {variant === 'positive' && <SuccessImage src={SucceedIcon} alt="" />}
    {children}
  </ToastBox>
);

const ToastBox = styled.output<{
  $variant: 'positive' | 'caution' | 'negative';
}>`
  display: inline-flex;
  align-items: center;
  gap: ${ColorData.spacing[8]};
  min-height: 2.75rem;
  padding: 0 ${ColorData.spacing[16]};
  border-radius: ${ColorData.radius.large};
  background-color: ${ColorData.colors.background};
  color: ${ColorData.colors.labelNormal};
  box-shadow: ${ColorData.shadow.popover};
  font-family: ${ColorData.typography.fontFamily};
  font-size: ${ColorData.typography.caption.fontSize};

  ${({ $variant }) => {
    if ($variant === 'negative') {
      return `border-left: 0.25rem solid ${ColorData.colors.negative};`;
    }

    if ($variant === 'caution') {
      return `border-left: 0.25rem solid ${ColorData.colors.caution};`;
    }

    return '';
  }}
`;

const SuccessImage = styled.img`
  display: block;
  width: 1rem;
  height: 1rem;
  flex: 0 0 auto;
  object-fit: contain;
`;
