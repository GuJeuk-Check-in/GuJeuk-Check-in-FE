import styled from '@emotion/styled';
import { adminTokens } from '@center/tokens';

interface LoadErrorViewProps {
  readonly onRetry: () => void;
  readonly title?: string;
  readonly hint?: string;
  readonly retryLabel?: string;
}

export const LoadErrorView = ({
  onRetry,
  title = '내용을 불러올 수 없습니다',
  hint = '다시 시도해주세요',
  retryLabel = '다시 시도하기',
}: LoadErrorViewProps) => (
  <ErrorView role="alert">
    <ErrorTitle>{title}</ErrorTitle>
    <ErrorHint>
      {hint}
      <RetryButton type="button" onClick={onRetry}>{retryLabel}</RetryButton>
    </ErrorHint>
  </ErrorView>
);

const ErrorView = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  text-align: center;
`;

const ErrorTitle = styled.p`
  margin: 0;
  color: #333333;
  font-size: 1.75rem;
  font-weight: 700;
`;

const ErrorHint = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  color: #666666;
  font-size: 0.9375rem;
`;

const RetryButton = styled.button`
  padding: 0;
  border: 0;
  border-bottom: 1px solid currentColor;
  background: transparent;
  color: ${({ theme }) => adminTokens(theme).colors.primaryDark};
  font-size: 0.8125rem;
  font-weight: 700;
  cursor: pointer;
`;
