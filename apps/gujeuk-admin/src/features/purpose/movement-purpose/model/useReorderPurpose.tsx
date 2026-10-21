import { useSortableItems } from '@center/ui/sortable-board';
import { useModal } from '@shared/hooks';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useUpdatePurposeMovement } from './useUpdatePurposeMovement';

interface Item {
  readonly id: string | number;
}

export const useReorderPurpose = <T extends Item>(initialItems?: readonly T[]) => {
  const { mutate: updateMovement } = useUpdatePurposeMovement();
  const modal = useModal();
  const sortable = useSortableItems({
    initialItems,
    onReorder: ({ items, rollback }) => {
      updateMovement(
        { purposeId: items.map((item) => Number(item.id)).filter((id) => !Number.isNaN(id)) },
        {
          onError: () => {
            rollback();
            modal.openModal({
              icon: <FaExclamationTriangle size={48} color="#D88282" />,
              title: '순서 변경 실패',
              subtitle: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
              theme: 'warning',
              buttons: [{ label: '확인', onClick: modal.closeModal }],
            });
          },
        },
      );
    },
  });

  return { ...sortable, modal };
};
