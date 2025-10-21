import { deletePurpose } from '../api/purposeApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeletePurposeList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePurpose,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purposeList'] });
      alert('방문 목적이 성공적으로 삭제되었습니다.');
    },
    onError: (error) => {
      alert(`삭제 실패: ${error.message}`);
    },
  });
};
