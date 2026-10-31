import { useConfirmDelete } from '@shared/lib/useConfirmDelete';

const MESSAGES = {
  title: (name: string) => `정말 ${name}님의 이용 기록을 삭제하시겠나요?`,
  subtitle: '삭제된 기록은 복구할 수 없습니다.',
  pendingSubtitle: '현재 기록은 삭제되지 않았습니다.',
};

export const useDeleteUsageHistory = () => useConfirmDelete(MESSAGES);
