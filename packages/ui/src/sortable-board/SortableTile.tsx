import { ReactNode, CSSProperties } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useReducedMotion } from './useReducedMotion';

interface SortableTileProps {
  id: number;
  children: ReactNode;
  label?: string;
  disabled?: boolean;
}

export const SortableTile = ({
  id,
  children,
  label,
  disabled = false,
}: SortableTileProps) => {
  const reducedMotion = useReducedMotion();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: reducedMotion ? undefined : transition,
    zIndex: isDragging ? 999 : 'auto',
    opacity: isDragging ? 0.8 : 1,
    width: '100%',
    height: '100%',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} aria-label={label}>
      {children}
    </div>
  );
};
