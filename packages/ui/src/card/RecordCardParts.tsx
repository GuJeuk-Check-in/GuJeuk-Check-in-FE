import { adminTokens } from '@center/tokens';
import styled from '@emotion/styled';
export const RecordContainer = styled.div`
  position: relative;
  width: min(100%, 80rem);
  min-height: 8.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: clamp(1rem, 2vw, 1.25rem) clamp(1.25rem, 3vw, 2rem);
  background-color: ${({ theme }) => adminTokens(theme).colors.white};
  border: 1px solid ${({ theme }) => adminTokens(theme).colors.cardBorder};
  border-radius: clamp(1.5rem, 3vw, 2.25rem);
  box-shadow: 0 0.125rem 0.375rem rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  margin: 0 auto;
  cursor: pointer;

  @media (max-width: 56rem) {
    align-items: flex-start;
    flex-direction: column;
  }
`;


export const RecordCardContent = styled.div`
  position: relative;
  z-index: 2;
  pointer-events: none;
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;

  @media (max-width: 56rem) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const RecordLeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(1rem, 4vw, 3.75rem);
  min-width: 0;

  @media (max-width: 40rem) {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.75rem;
  }
`;

export const RecordTitle = styled.h2`
  color: ${({ theme }) => adminTokens(theme).colors.text};
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 600;
  line-height: 1.2;
  margin: 0;
  overflow-wrap: anywhere;
`;

export const RecordSummary = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => adminTokens(theme).colors.text};
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  white-space: nowrap;
`;
export const RecordDivider = styled.div`
  width: 0.0625rem;
  height: 1.25rem;
  background-color: #aaa;
`;

export const RecordRightSection = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
  min-width: 0;

  @media (max-width: 56rem) {
    width: 100%;
    justify-content: flex-end;
    margin-left: 0;
  }
`;

export const RecordMeta = styled.span`
  color: ${({ theme }) => adminTokens(theme).colors.mutedText};
  font-size: clamp(1rem, 2vw, 1.25rem);
  overflow-wrap: anywhere;
`;

export const RecordCloseButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #969696;
  cursor: pointer;
`;
