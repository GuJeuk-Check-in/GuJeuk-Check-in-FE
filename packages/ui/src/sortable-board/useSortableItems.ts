import { useEffect, useRef, useState } from 'react';
import { KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

interface SortableItem {
  readonly id: UniqueIdentifier;
}

export interface ReorderChange<T> {
  readonly items: T[];
  readonly movedItem: T;
  readonly rollback: () => void;
}

interface SortableItemsOptions<T> {
  readonly initialItems?: readonly T[];
  readonly onReorder: (change: ReorderChange<T>) => void;
}

export const reconcileSortableItems = <T extends SortableItem>(
  current: T[], previous: readonly T[], incoming: readonly T[],
): T[] => {
  if (previous.length !== incoming.length || previous.some((item, index) => item.id !== incoming[index].id)) {
    return [...incoming];
  }
  const byId = new Map(incoming.map((item) => [item.id, item]));
  const reconciled = current.map((item) => byId.get(item.id) ?? item);
  return reconciled.every((item, index) => item === current[index]) ? current : reconciled;
};

export const useSortableItems = <T extends SortableItem>({ initialItems, onReorder }: SortableItemsOptions<T>) => {
  const [items, setItems] = useState<T[]>(() => [...(initialItems ?? [])]);
  const previousSource = useRef(initialItems);
  const revision = useRef(0);

  useEffect(() => {
    if (!initialItems || initialItems === previousSource.current) return;
    const previous = previousSource.current ?? [];
    previousSource.current = initialItems;
    revision.current += 1;
    setItems((current) => reconcileSortableItems(current, previous, initialItems));
  }, [initialItems]);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    const nextItems = arrayMove(items, oldIndex, newIndex);
    const currentRevision = ++revision.current;
    setItems(nextItems);
    onReorder({
      items: nextItems,
      movedItem: items[oldIndex],
      rollback: () => {
        if (revision.current !== currentRevision) return;
        revision.current += 1;
        setItems(items);
      },
    });
  };

  return { items, sensors, handleDragEnd };
};
