import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUserVisit } from '../api/visitApi';

export const useCreateUserVisit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserVisit,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visits'] });
    },

    onError: (error) => {
      console.error('이용 기록 생성 중 오류 발생:', error);
      alert('등록에 실패했습니다: ' + (error.message || '알 수 없는 오류'));
    },
  });
};
