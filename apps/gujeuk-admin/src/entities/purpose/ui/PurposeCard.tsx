import {
  TileContainer as Container,
  TileDeleteIcon as DeleteIcon,
  TileLabel as Label,
  TileEditInput as EditInput,
  TileStyledEditIcon as StyledEditIcon,
  stopTileDrag,
  useInlineEdit,
} from '@center/ui/card';
import { IoClose } from 'react-icons/io5';

interface Purpose {
  id: number;
  purpose: string;
}

interface PurposeProps {
  purpose: Purpose;
  index: number;
  onDelete: (id: number) => void;
  onUpdate: (params: { id: number; newPurpose: string }) => void;
  isDeleting: boolean;
}

export const PurposeCard = ({
  index,
  purpose,
  onDelete,
  onUpdate,
  isDeleting,
}: PurposeProps) => {
  const edit = useInlineEdit({
    value: purpose.purpose,
    onSubmit: (newPurpose) => onUpdate({ id: purpose.id, newPurpose }),
    disabled: isDeleting,
  });

  return (
    <Container isDisabled={isDeleting}>
      <DeleteIcon
        type="button"
        onClick={() => onDelete(purpose.id)}
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        isDeleting={isDeleting}
        disabled={isDeleting}
      >
        {isDeleting ? (
          '...'
        ) : (
          <IoClose size="1.25rem" style={{ pointerEvents: 'none' }} />
        )}
      </DeleteIcon>

      {edit.isEditing ? (
        <EditInput
          type="text"
          {...edit.inputProps}
        />
      ) : (
        <Label>
          {index}. {purpose.purpose}
          <StyledEditIcon
            size={18}
            onClick={edit.start}
            onPointerDown={stopTileDrag}
            onMouseDown={stopTileDrag}
            isDeleting={isDeleting}
          />
        </Label>
      )}
    </Container>
  );
};
