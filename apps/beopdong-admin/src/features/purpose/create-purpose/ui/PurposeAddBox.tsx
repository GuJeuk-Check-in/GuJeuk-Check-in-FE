import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { adminTokens } from '@center/tokens';
import { AddTileContainer } from '@center/ui/card';
import { MdAdd } from 'react-icons/md';

interface PurposeAddBoxProps {
  readonly onClick: () => void;
}

export const PurposeAddBox = ({ onClick }: PurposeAddBoxProps) => {
  const colors = adminTokens(useTheme()).colors;

  return (
    <AddButton
      $isAddButton
      $isDisabled={false}
      $borderColor={colors.primary}
      $hoverColor={colors.primaryLight}
      type="button"
      aria-label="이용대장 추가"
      onClick={onClick}
    >
      <MdAdd size="3rem" aria-hidden="true" />
    </AddButton>
  );
};

const AddButton = styled(AddTileContainer.withComponent('button'))`
  color: ${({ theme }) => adminTokens(theme).colors.primary};

  &:focus-visible {
    outline: 0.125rem solid ${({ theme }) => adminTokens(theme).colors.primaryDark};
    outline-offset: -0.25rem;
  }
`;
