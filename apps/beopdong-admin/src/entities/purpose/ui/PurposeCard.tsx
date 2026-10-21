import styled from '@emotion/styled';
import { adminTokens } from '@center/tokens';
import { useInlineEdit, TileContainer, TileDeleteIcon, TileEditInput, TileLabel } from '@center/ui/card';
import { IoClose } from 'react-icons/io5';
import { MdEdit, MdLock } from 'react-icons/md';

export interface Purpose {
  readonly id: number;
  readonly purpose: string;
  readonly isLocked: boolean;
}

interface PurposeCardProps {
  readonly purpose: Purpose;
  readonly onUpdate: (purpose: Purpose, newLabel: string) => void;
  readonly onDelete: (purpose: Purpose) => void;
}

export const PurposeCard = ({ purpose, onUpdate, onDelete }: PurposeCardProps) => {
  const edit = useInlineEdit({
    value: purpose.purpose,
    onSubmit: (label) => onUpdate(purpose, label),
    disabled: purpose.isLocked,
  });

  return (
    <Container isDisabled={false}>
      {!purpose.isLocked && !edit.isEditing && (
        <DeleteButton
          type="button"
          isDeleting={false}
          aria-label={`${purpose.purpose} 삭제`}
          onPointerDown={(event) => event.stopPropagation()}
          onMouseDown={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
          onClick={() => onDelete(purpose)}
        >
          <IoClose size="1.25rem" aria-hidden="true" />
        </DeleteButton>
      )}
      {edit.isEditing ? (
        <TileEditInput
          type="text"
          aria-label="이용대장 이름 수정"
          placeholder="이용대장 이름을 입력해주세요"
          {...edit.inputProps}
        />
      ) : (
        <Label>
          <Name>{purpose.purpose}</Name>
          {purpose.isLocked ? (
            <MdLock size="1.25rem" aria-label="수정·삭제 잠금" />
          ) : (
            <EditButton
              type="button"
              aria-label={`${purpose.purpose} 수정`}
              onPointerDown={(event) => event.stopPropagation()}
              onMouseDown={(event) => event.stopPropagation()}
              onKeyDown={(event) => event.stopPropagation()}
              onClick={edit.start}
            >
              <MdEdit size="1.125rem" aria-hidden="true" />
            </EditButton>
          )}
        </Label>
      )}
    </Container>
  );
};

const Container = styled(TileContainer)`
  padding: 1.5rem;
`;

const Label = styled(TileLabel)`
  min-width: 0;
  max-width: 100%;
  text-align: center;

  > svg {
    flex-shrink: 0;
  }
`;

const Name = styled.span`
  overflow-wrap: anywhere;
`;

const EditButton = styled.button`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border: none;
  background: transparent;
  color: #666666;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => adminTokens(theme).colors.primaryDark};
  }

  &:focus-visible {
    outline: 0.125rem solid ${({ theme }) => adminTokens(theme).colors.primaryDark};
    outline-offset: 0.125rem;
  }
`;

const DeleteButton = styled(TileDeleteIcon)`
  display: inline-flex;
  padding: 0.25rem;

  &:focus-visible {
    outline: 0.125rem solid ${({ theme }) => adminTokens(theme).colors.primaryDark};
    outline-offset: 0.125rem;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
