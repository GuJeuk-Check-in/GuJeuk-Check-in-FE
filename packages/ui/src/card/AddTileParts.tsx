import styled from '@emotion/styled';

interface AddTileContainerProps {
  $isAddButton?: boolean;
  $isDisabled?: boolean;
  $borderColor?: string;
  $hoverColor?: string;
}

export const AddTileContainer = styled.div<AddTileContainerProps>`
  width: 100%;
  height: 100%;
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: ${({ $isAddButton }) =>
    $isAddButton ? 'center' : 'space-between'};
  padding: ${({ $isAddButton }) => ($isAddButton ? '0' : '0 1rem')};
  background-color: #ffffff;
  border: ${({ $isAddButton, $borderColor = '#6f95c4' }) =>
    $isAddButton
      ? `0.125rem dashed ${$borderColor}`
      : `0.0625rem solid ${$borderColor}`};
  box-sizing: border-box;
  margin: 0 auto 0.9375rem auto;
  transition: 0.2s ease;
  opacity: ${(props) => (props.$isDisabled ? 0.6 : 1)};
  cursor: ${(props) =>
    props.$isDisabled
      ? 'not-allowed'
      : props.$isAddButton
      ? 'pointer'
      : 'default'};
  pointer-events: ${(props) =>
    props.$isDisabled && !props.$isAddButton && 'none'};

  &:hover {
    background-color: ${({ $isAddButton, $isDisabled, $hoverColor = '#f9fbff' }) =>
      $isAddButton && !$isDisabled ? $hoverColor : '#ffffff'};
  }
`;

export const AddTileInput = styled.input<{ $accentColor?: string }>`
  font-size: 1.375rem;
  border: none;
  border-bottom: 0.125rem solid ${({ $accentColor = '#007bff' }) => $accentColor};
  outline: none;
  padding: 0.25rem 0;
  width: 70%;
  color: #2e2e32;
  font-weight: 500;

  &:disabled {
    cursor: progress;
    background-color: #f0f0f0;
  }
`;

export const AddTileActions = styled.div`
  display: flex;
  gap: 0.9375rem;
`;
