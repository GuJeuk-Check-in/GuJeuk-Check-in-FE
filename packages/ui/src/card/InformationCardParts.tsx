import { adminTokens } from '@center/tokens';
import styled from '@emotion/styled';
export const InformationContainer = styled.div`
  width: 100%;
  max-width: 80rem;
  background-color: ${({ theme }) => adminTokens(theme).colors.white};
  border: 1px solid ${({ theme }) => adminTokens(theme).colors.cardBorder};
  border-radius: ${({ theme }) => adminTokens(theme).components.cardRadius};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  box-sizing: border-box;
  min-height: 10rem;
  margin: 0 auto;
  cursor: pointer;
  box-shadow: 0 0.125rem 0.375rem rgba(0, 0, 0, 0.08);

  &:hover {
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.12);
    transition: box-shadow 0.2s ease;
  }

  @media (max-width: 64rem) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
    min-height: auto;
    padding: 1.5rem;
  }
`;

export const InformationLeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  margin-left: 1.25rem;

  @media (max-width: 64rem) {
    margin-left: 0;
  }
`;

export const InformationSubtitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 400;
  color: ${({ theme }) => adminTokens(theme).colors.text};
  margin: 0;
`;

export const InformationTitle = styled.h2`
  font-size: 2.1rem;
  font-weight: 600;
  color: ${({ theme }) => adminTokens(theme).colors.text};
  margin: 0;
`;

export const InformationDiver = styled.div`
  width: 0.09375rem;
  height: 1.25rem;
  background-color: #aaa;
  padding: 0;

  @media (max-width: 40rem) {
    display: none;
  }
`;

export const InformationRightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;

  @media (max-width: 64rem) {
    width: 100%;
  }
`;

export const InformationEditButton = styled.button`
  font-size: ${({ theme }) => adminTokens(theme).typography.input};
  color: ${({ theme }) => adminTokens(theme).colors.secondaryText};
  border: none;
  background: none;
  border-bottom: 1px solid ${({ theme }) => adminTokens(theme).colors.secondaryText};
  cursor: pointer;
  padding: 0;
`;

export const InformationMetaText = styled.span`
  font-size: ${({ theme }) => adminTokens(theme).typography.input};
  color: ${({ theme }) => adminTokens(theme).colors.secondaryText};
`;

export const InformationMetaDetail = styled.span`
  font-size: ${({ theme }) => adminTokens(theme).typography.input};
  color: ${({ theme }) => adminTokens(theme).colors.secondaryText};
`;

export const InformationMetaSupplement = styled.span`
  font-size: ${({ theme }) => adminTokens(theme).typography.input};
  color: ${({ theme }) => adminTokens(theme).colors.secondaryText};
`;

export const InformationMetaBlock = styled.div`
  font-size: ${({ theme }) => adminTokens(theme).typography.input};
  color: ${({ theme }) => adminTokens(theme).colors.secondaryText};
`;

export const InformationRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
  min-width: 0;

  @media (max-width: 64rem) {
    align-items: flex-start;
    width: 100%;
  }
`;

export const InformationInfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  min-width: 0;

  @media (max-width: 40rem) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;
