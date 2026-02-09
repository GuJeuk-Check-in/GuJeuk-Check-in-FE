import { useState, useEffect } from 'react';
import {
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useUpdatePurposeMovement } from '../model/useUpdatePurposeMovement';
import { useModal } from '@shared/hooks/useModal';
import { FaExclamationTriangle } from 'react-icons/fa';

export const useReorderPurpose = (initialItems: any[]) => {
  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    if (initialItems && initialItems.length > 0) {
      const initialIds = initialItems.map((i) => i.id).join(',');
      const currentIds = items.map((i) => i.id).join(',');

      if (initialIds !== currentIds) {
        setItems(initialItems);
      }
    }
  }, [initialItems]);

  const { mutate: updateMovement } = useUpdatePurposeMovement();
  const { openModal, closeModal } = useModal();

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldItems = [...items];
    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    const newOrderedItems = arrayMove(items, oldIndex, newIndex);

    setItems(newOrderedItems);

    updateMovement(
      { purposeId: newOrderedItems.map((item) => item.id) },
      {
        onError: () => {
          setItems(oldItems);
          openModal({
            icon: <FaExclamationTriangle size={48} color="#D88282" />,
            title: '순서 변경 실패',
            subtitle: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
            theme: 'warning',
            buttons: [{ label: '확인', onClick: closeModal }],
          });
        },
      }
    );
  };

  return { items, sensors, handleDragEnd };
};
