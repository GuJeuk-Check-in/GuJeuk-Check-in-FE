import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { adminTokens } from '@center/tokens';
import { useInlineAdd, AddTileContainer, AddTileInput, AddTileActions } from '@center/ui/card';
import { MdAdd, MdCheck, MdClose } from 'react-icons/md';

interface PurposeAddBoxProps {
  readonly onSubmit: (label: string) => void;
}

export const PurposeAddBox = ({ onSubmit }: PurposeAddBoxProps) => {
  const colors = adminTokens(useTheme()).colors;
  const add = useInlineAdd({ onSubmit });

  if (!add.isAdding) {
    return (
      <AddButton
        $isAddButton
        $isDisabled={false}
        $borderColor={colors.primary}
        $hoverColor={colors.primaryLight}
        type="button"
        aria-label="이용대장 추가"
        onClick={add.start}
      >
        <MdAdd size="3rem" aria-hidden="true" />
      </AddButton>
    );
  }

  return (
    <AddTileContainer $isDisabled={false} $borderColor={colors.primary}>
      <AddTileInput
        $accentColor={colors.primary}
        type="text"
        aria-label="새 이용대장 이름"
        placeholder="목적을 입력하세요"
        {...add.inputProps}
      />
      <AddTileActions>
        <ActionButton type="button" aria-label="이용대장 추가 확인" onClick={add.submit}>
          <MdCheck size="1.625rem" aria-hidden="true" />
        </ActionButton>
        <ActionButton $isCancel type="button" aria-label="이용대장 추가 취소" onClick={add.cancel}>
          <MdClose size="1.625rem" aria-hidden="true" />
        </ActionButton>
      </AddTileActions>
    </AddTileContainer>
  );
};

const AddButton = styled(AddTileContainer.withComponent('button'))`
  color: ${({ theme }) => adminTokens(theme).colors.primary};

  &:focus-visible {
    outline: 0.125rem solid ${({ theme }) => adminTokens(theme).colors.primaryDark};
    outline-offset: -0.25rem;
  }
`;

const ActionButton = styled.button<{ $isCancel?: boolean }>`
  display: inline-flex;
  border: none;
  background: transparent;
  padding: 0;
  color: ${({ theme, $isCancel }) =>
    $isCancel ? adminTokens(theme).colors.error : adminTokens(theme).colors.primary};
  cursor: pointer;

  &:focus-visible {
    outline: 0.125rem solid currentColor;
    outline-offset: 0.125rem;
  }
`;
