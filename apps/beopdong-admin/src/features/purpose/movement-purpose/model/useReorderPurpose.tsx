import { useState } from 'react';
import { MdErrorOutline } from 'react-icons/md';
import type { useModal } from '@center/ui/modal';
import { useSortableItems } from '@center/ui/sortable-board';
import type { Purpose } from '@entities/purpose';
import { useUpdatePurposeMovement } from './useUpdatePurposeMovement';

export const useReorderPurpose = (initialPurposes: readonly Purpose[] | undefined, failureModal: ReturnType<typeof useModal>) => {
  const [announcement, setAnnouncement] = useState('');
  const { mutate: updateMovement } = useUpdatePurposeMovement();
  const sortable = useSortableItems({
    initialItems: initialPurposes,
    onReorder: ({ items, movedItem, rollback }) => {
      updateMovement(
        { purposeId: items.map((item) => item.id) },
        {
          onSuccess: () => {
            setAnnouncement(`${movedItem.purpose} 순서를 변경했습니다.`);
          },
          onError: () => {
            rollback();
            failureModal.openModal({
              icon: <MdErrorOutline />,
              title: '순서 변경에 실패했습니다',
              subtitle: '이용대장으로 돌아가 다시 변경해주세요',
              buttons: [{ label: '이용대장으로', variant: 'primary', onClick: failureModal.closeModal }],
            });
          },
        },
      );
    },
  });

  return { ...sortable, announcement };
};
