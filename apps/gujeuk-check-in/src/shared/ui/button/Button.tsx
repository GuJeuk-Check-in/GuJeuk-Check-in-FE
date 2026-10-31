import styled from "@emotion/styled";
import type { ReactNode } from "react";
import { ColorData } from "../design-system/ColorData";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "medium" | "small";
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({
  children,
  variant = "primary",
  size = "medium",
  type = "button",
  disabled = false,
  onClick,
}: ButtonProps) => (
  <StyledButton
    type={type}
    $variant={variant}
    $size={size}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </StyledButton>
);

const StyledButton = styled.button<{
  $variant: "primary" | "secondary" | "danger";
  $size: "medium" | "small";
}>`
  min-height: ${({ $size }) => ($size === "small" ? "2rem" : "2.5rem")};
  padding: 0
    ${({ $size }) =>
      $size === "small" ? ColorData.spacing[12] : ColorData.spacing[16]};
  border: 1px solid transparent;
  border-radius: ${ColorData.radius.large};
  font-family: ${ColorData.typography.fontFamily};
  font-size: ${({ $size }) =>
    $size === "small"
      ? ColorData.typography.caption.fontSize
      : ColorData.typography.body.fontSize};
  font-weight: 600;
  line-height: ${ColorData.typography.body.lineHeight};
  cursor: pointer;
  transition:
    background-color ${ColorData.interaction.transitionFast},
    border-color ${ColorData.interaction.transitionFast},
    box-shadow ${ColorData.interaction.transitionFast};

  ${({ $variant }) => {
    if ($variant === "secondary") {
      return `
        border-color: ${ColorData.colors.lineNormal};
        background-color: ${ColorData.colors.background};
        color: ${ColorData.colors.labelNormal};

        &:hover:not(:disabled) {
          background-color: ${ColorData.colors.fillNormal};
        }
      `;
    }

    if ($variant === "danger") {
      return `
        background-color: ${ColorData.colors.negative};
        color: ${ColorData.colors.background};

        &:hover:not(:disabled) {
          background-color: #e83b3b;
        }
      `;
    }

    return `
      background-color: ${ColorData.colors.primary};
      color: ${ColorData.colors.background};

      &:hover:not(:disabled) {
        background-color: ${ColorData.colors.primaryStrong};
      }
    `;
  }}

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: none;
    box-shadow: ${ColorData.shadow.focus};
  }

  &:disabled {
    background-color: ${ColorData.colors.interactionDisabled};
    border-color: transparent;
    color: ${ColorData.colors.labelDisabled};
    cursor: not-allowed;
  }
`;
