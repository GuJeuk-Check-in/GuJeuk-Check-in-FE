import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePurpose } from '../purposeApi';

export const useUpdatePurpose = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, newPurpose }) => updatePurpose(id, newPurpose),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purposeList'] });
      alert('방문 목적이 성공적으로 수정되었습니다.');
    },

    onError: (error) => {
      alert(`방문 목적 수정 실패: ${error.message}`);
    },
  });
};
