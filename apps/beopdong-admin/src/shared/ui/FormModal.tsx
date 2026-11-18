import { useId, type ReactNode } from 'react';
import styled from '@emotion/styled';
import { adminTokens } from '@center/tokens';
import { Dialog } from '@center/ui/modal';

interface FormModalProps {
  readonly title: string;
  readonly subtitle: string;
  readonly icon?: ReactNode;
  readonly onConfirm: () => void;
  readonly onClose: () => void;
  readonly children?: ReactNode;
}

export const FormModal = ({ title, subtitle, icon, onConfirm, onClose, children }: FormModalProps) => {
  const titleId = useId();
  const subtitleId = useId();

  return (
    <Content onClose={onClose} aria-labelledby={titleId} aria-describedby={subtitleId}>
      <IconWrapper>
        {icon ?? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <path d="M12 7.5v9M7.5 12h9" />
          </svg>
        )}
      </IconWrapper>
      <Title id={titleId}>{title}</Title>
      <Subtitle id={subtitleId}>{subtitle}</Subtitle>
      {children}
      <Actions>
        <CancelButton type="button" onClick={onClose}>아니요</CancelButton>
        <ConfirmButton type="button" onClick={onConfirm}>예</ConfirmButton>
      </Actions>
    </Content>
  );
};

const Content = styled(Dialog)`
  box-sizing: border-box;
  width: 90%;
  max-width: 32rem;
  max-height: calc(100dvh - 2rem);
  overflow-y: auto;
  padding: 2.25rem 2rem 2rem;
  text-align: center;
  background-color: ${({ theme }) => adminTokens(theme).colors.white};
  border: 0.0625rem solid #d1d5db;
  border-radius: 1rem;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.15);

  &:focus {
    outline: none;
  }

  @media (max-width: 32rem) {
    width: calc(100% - 2rem);
    padding: 1.5rem 1rem;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  color: ${({ theme }) => adminTokens(theme).colors.primary};

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

const Title = styled.h2`
  margin: 0.75rem 0 0.375rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => adminTokens(theme).colors.primary};
`;

const Subtitle = styled.p`
  margin: 0 0 1.75rem;
  font-size: 0.8rem;
  color: #6b7280;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const ActionButton = styled.button`
  min-width: 10rem;
  padding: 0.65rem 2rem;
  font-size: 1.15rem;
  font-weight: 600;
  border: none;
  border-radius: 62.4375rem;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    transform 0.15s ease;

  &:active {
    transform: scale(0.97);
  }
`;

const CancelButton = styled(ActionButton)`
  background-color: #ededed;
  color: #6b6b6b;

  &:hover {
    background-color: #cccccc;
  }
`;

const ConfirmButton = styled(ActionButton)`
  min-width: 10rem;
  background-color: ${({ theme }) => adminTokens(theme).colors.primary};
  color: ${({ theme }) => adminTokens(theme).colors.white};

  &:hover {
    background-color: #ce7600;
  }
`;
