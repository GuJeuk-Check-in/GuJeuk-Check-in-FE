import { useConfirmDelete } from '@shared/lib/useConfirmDelete';

const MESSAGES = {
  title: (name: string) => `정말 ${name}님을 삭제하시겠나요?`,
  subtitle: '삭제된 회원은 복구할 수 없습니다.',
  pendingSubtitle: '현재 회원은 삭제되지 않았습니다.',
};

export const useDeleteUser = () => useConfirmDelete(MESSAGES);
