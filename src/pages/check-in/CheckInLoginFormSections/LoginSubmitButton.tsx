import styled from '@emotion/styled';

type LoginSubmitButtonProps = {
  readonly isSaving: boolean;
  readonly onClick: () => void;
};

export const LoginSubmitButton = ({
  isSaving,
  onClick,
}: LoginSubmitButtonProps) => (
  <SubmitButton type="button" onClick={onClick} disabled={isSaving}>
    {isSaving ? '저장 중...' : '다 했어요! 🎉'}
  </SubmitButton>
);

const SubmitButton = styled.button`
  width: 100%;
  min-height: 4.6rem;
  margin-top: 2.5rem;
  border: 0;
  border-radius: 2.3rem;
  background-color: #145cad;
  box-shadow: 0 0.35rem 0 #c9d7e8;
  color: #ffffff;
  cursor: pointer;
  font-family: 'Jua', 'Pretendard', sans-serif;
  font-size: clamp(1.6rem, 3vw, 2.2rem);

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;
