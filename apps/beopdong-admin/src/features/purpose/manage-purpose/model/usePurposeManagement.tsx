import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { adminTokens } from '@center/tokens';
import { useModal } from '@center/ui/modal';
import { useSortableItems } from '@center/ui/sortable-board';
import { MdWarning } from 'react-icons/md';
import type { Purpose } from '@entities/purpose';

export const usePurposeManagement = (initialPurposes: readonly Purpose[]) => {
  const [announcement, setAnnouncement] = useState('');
  const modal = useModal();
  const tokens = adminTokens(useTheme());
  const sortable = useSortableItems({
    initialItems: initialPurposes,
    onReorder: ({ movedItem }) => {
      setAnnouncement(`${movedItem.purpose} 순서를 화면에서만 변경했습니다. 새로고침하면 초기화됩니다.`);
    },
  });

  const showApiNotice = (action: string) => {
    modal.openModal({
      title: `${action} API 연결 전입니다.`,
      subtitle: '변경 내용은 아직 저장되지 않았습니다.',
      buttons: [{ label: '확인', onClick: modal.closeModal }],
    });
  };

  const handleCreate = (label: string) => {
    if (!label.trim()) {
      modal.openModal({
        title: '입력 확인',
        subtitle: '이용대장 이름을 입력해주세요.',
        buttons: [{ label: '확인', onClick: modal.closeModal }],
      });
      return;
    }
    showApiNotice('추가');
  };

  const handleUpdate = (purpose: Purpose) => {
    if (!purpose.isLocked) showApiNotice('수정');
  };

  const handleDelete = (purpose: Purpose) => {
    if (purpose.isLocked) return;
    modal.openModal({
      icon: <MdWarning size="2.5rem" color={tokens.colors.error} />,
      title: '이용대장을 삭제하시겠습니까?',
      subtitle: `‘${purpose.purpose}’ 이용대장을 삭제합니다.`,
      theme: 'warning',
      buttons: [
        { label: '취소', variant: 'secondary', onClick: modal.closeModal },
        { label: '삭제', bgColor: tokens.colors.error, onClick: () => showApiNotice('삭제') },
      ],
    });
  };

  return { ...sortable, announcement, modal, handleCreate, handleUpdate, handleDelete };
};
