import styled from '@emotion/styled';
import type { InputHTMLAttributes } from 'react';
import { ColorData } from '../design-system/ColorData';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: InputProps) => <StyledInput {...props} />;

const StyledInput = styled.input`
  width: 100%;
  min-height: 2.75rem;
  padding: 0 ${ColorData.spacing[12]};
  box-sizing: border-box;
  border: 1px solid ${ColorData.colors.lineNormal};
  border-radius: ${ColorData.radius.medium};
  background-color: ${ColorData.colors.background};
  color: ${ColorData.colors.labelNormal};
  font-family: ${ColorData.typography.fontFamily};
  font-size: ${ColorData.typography.body.fontSize};
  outline: none;
  transition: border-color ${ColorData.interaction.transitionFast},
    box-shadow ${ColorData.interaction.transitionFast};

  &::placeholder {
    color: ${ColorData.colors.labelAssistive};
  }

  &:focus {
    border-color: ${ColorData.colors.primary};
    box-shadow: ${ColorData.shadow.focus};
  }

  &:disabled {
    background-color: ${ColorData.colors.interactionDisabled};
    color: ${ColorData.colors.labelDisabled};
    cursor: not-allowed;
  }
`;
