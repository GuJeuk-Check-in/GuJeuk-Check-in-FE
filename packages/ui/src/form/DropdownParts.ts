import { adminTokens } from '@center/tokens';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const slideDown = keyframes`
from {
  opacity: 0;
  transform: translateY(-10px);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`;

export const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  box-sizing: border-box;
`;

export const DropdownLabel = styled.label`
  font-size: ${({ theme }) => adminTokens(theme).typography.input};
  color: ${({ theme }) => adminTokens(theme).colors.text};
  font-weight: 500;
`;

export const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const DropdownHeader = styled.div<{ disabled?: boolean }>`
  width: 100%;
  height: ${({ theme }) => adminTokens(theme).components.fieldHeight};
  border: 0.0625rem solid ${({ theme }) => adminTokens(theme).colors.fieldBorder};
  border-radius: ${({ theme }) => adminTokens(theme).components.fieldRadius};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  font-size: ${({ theme }) => adminTokens(theme).typography.input};
  color: ${({ disabled, theme }) => (disabled ? '#a0a0a0' : adminTokens(theme).colors.text)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background-color: ${({ disabled, theme }) => (disabled ? '#f5f5f5' : adminTokens(theme).colors.white)};
  box-sizing: border-box;
`;

export const DropdownValue = styled.span`
  text-align: left;
`;

export const DropdownArrowIcon = styled.div`
  display: flex;
  align-items: center;
  color: inherit;
`;

export const DropdownList = styled.div`
  position: absolute;
  top: 4rem;
  left: 0;
  width: 100%;
  max-height: 15rem;
  overflow-y: auto;
  background-color: ${({ theme }) => adminTokens(theme).colors.white};
  border: 0.0625rem solid ${({ theme }) => adminTokens(theme).colors.fieldBorder};
  border-radius: ${({ theme }) => adminTokens(theme).components.fieldRadius};
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
  z-index: 100;
  animation: ${slideDown} 0.2s ease-out;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 0.375rem;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #dcdcdc;
    border-radius: 0.1875rem;
  }
`;

export const DropdownItem = styled.div<{ isSelected: boolean }>`
  padding: 0.75rem 1rem;
  font-size: 1.125rem;
  color: ${({ isSelected, theme }) => (isSelected ? adminTokens(theme).colors.white : adminTokens(theme).colors.text)};
  background-color: ${({ isSelected, theme }) => (isSelected ? adminTokens(theme).colors.text : adminTokens(theme).colors.white)};
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ isSelected, theme }) =>
      isSelected ? adminTokens(theme).colors.text : '#f5f5f5'};
  }
`;

export const DropdownOtherWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`;

export const DropdownOtherInput = styled.input`
  flex: 1;
  border: none;
  border-bottom: 0.0625rem solid ${({ theme }) => adminTokens(theme).colors.text};
  background: transparent;
  font-size: 1.125rem;
  color: inherit;
  outline: none;
  padding: 0.125rem 0;

  &::placeholder {
    color: #a0a0a0;
  }
`;
