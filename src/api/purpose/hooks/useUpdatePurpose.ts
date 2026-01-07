import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePurpose } from '../api';
import { AxiosError } from 'axios';
import { UpdatePurposeRequest } from '../types';
import usePurposeStore from '../../../store/PurposeStore';

export const useUpdatePurpose = () => {
  const queryClient = useQueryClient();
  const updateLocalPurpose = usePurposeStore((state) => state.updatePurpose);

  return useMutation<
    void,
    AxiosError<{ message?: string }>,
    UpdatePurposeRequest
  >({
    // 👇 여기에 로그를 추가해보세요
    mutationFn: (variables) => {
      console.log('=== API 호출 데이터 확인 ===');
      console.log('id:', variables.id);
      console.log('purpose:', variables.purpose); // 여기가 undefined나 빈 값인지 확인!

      return updatePurpose(variables.id, { purpose: variables.purpose });
    },
    onSuccess: (_, variables) => {
      updateLocalPurpose(variables.id, variables.purpose);
      queryClient.invalidateQueries({ queryKey: ['purposeList'] });
      alert('방문 목적이 성공적으로 수정되었습니다.');
    },

    onError: (error) => {
      alert(
        error.response?.data?.message ?? error.message ?? '방문 목적 수정 실패'
      );
    },
  });
};
