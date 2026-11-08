import { useState } from 'react';
import { useModal } from '@center/ui/modal';
import { useSortableItems } from '@center/ui/sortable-board';
import { openApiPendingNotice } from '@shared/lib/openApiPendingNotice';
import { openInputCheckNotice } from '@shared/lib/openInputCheckNotice';
import { useConfirmModal } from '@shared/lib/useConfirmModal';
import type { Purpose } from '@entities/purpose';

export const usePurposeManagement = (initialPurposes: readonly Purpose[]) => {
  const [announcement, setAnnouncement] = useState('');
  const modal = useModal();
  const { confirmModal, openConfirm } = useConfirmModal();
  const sortable = useSortableItems({
    initialItems: initialPurposes,
    onReorder: ({ movedItem }) => {
      setAnnouncement(`${movedItem.purpose} 순서를 화면에서만 변경했습니다. 새로고침하면 초기화됩니다.`);
    },
  });

  const showApiNotice = (action: string) => {
    openApiPendingNotice(modal, action, '변경 내용은 아직 저장되지 않았습니다.');
  };

  const handleCreate = (label: string) => {
    if (!label.trim()) {
      openInputCheckNotice(modal, '이용대장 이름을 입력해주세요.');
      return;
    }
    showApiNotice('추가');
  };

  const handleUpdate = (purpose: Purpose) => {
    if (!purpose.isLocked) showApiNotice('수정');
  };

  const handleDelete = (purpose: Purpose) => {
    if (purpose.isLocked) return;
    openConfirm({
      title: '이 이용대장을 삭제하시겠습니까?',
      subtitle: purpose.purpose,
      onConfirm: () => showApiNotice('삭제'),
    });
  };

  return { ...sortable, announcement, modal, confirmModal, handleCreate, handleUpdate, handleDelete };
};
