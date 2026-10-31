import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import { ColorData } from '../design-system/ColorData';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'positive' | 'caution' | 'negative';
}

export const Badge = ({ children, variant = 'primary' }: BadgeProps) => (
  <BadgeBox $variant={variant}>{children}</BadgeBox>
);

const BadgeBox = styled.span<{
  $variant: 'primary' | 'positive' | 'caution' | 'negative';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px ${ColorData.spacing[12]};
  border-radius: ${ColorData.radius.pill};
  font-family: ${ColorData.typography.fontFamily};
  font-size: ${ColorData.typography.caption.fontSize};
  font-weight: 600;
  line-height: 1;

  ${({ $variant }) => {
    if ($variant === 'positive') {
      return `
        background-color: ${ColorData.colors.positiveBackground};
        color: ${ColorData.colors.positive};
      `;
    }

    if ($variant === 'caution') {
      return `
        background-color: ${ColorData.colors.cautionBackground};
        color: ${ColorData.colors.caution};
      `;
    }

    if ($variant === 'negative') {
      return `
        background-color: ${ColorData.colors.negativeBackground};
        color: ${ColorData.colors.negative};
      `;
    }

    return `
      background-color: ${ColorData.colors.primary8};
      color: ${ColorData.colors.primary};
    `;
  }}
`;
