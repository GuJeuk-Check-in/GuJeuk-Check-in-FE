import { createPurpose } from '../api/purposeApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * @returns {object}
 */
export const useCreatePurpose = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPurpose,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['purposeList'] });
      alert(`새로운 방문 목적 "${variables}"이(가) 성공적으로 생성되었습니다.`);
    },

    onError: (error, variables) => {
      console.error('목적 생성을 실패하였습니다: ', error, variables);
      alert(`목적 생성에 실패하였습니다: ${error.message}`);
    },
  });
};
