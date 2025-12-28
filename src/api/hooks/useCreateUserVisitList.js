import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUserVisit } from '../visitApi';

export const useCreateUserVisit = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUserVisit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visits'] });
      alert('시설 이용 추가가 완료되었습니다.');
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error) => {
      console.error('이용 기록 생성 중 오류 발생:', error);
      alert('등록에 실패했습니다: ' + (error.message || '알 수 없는 오류'));
    },
  });
};
