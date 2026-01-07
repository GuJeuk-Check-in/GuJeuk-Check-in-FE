import { createPurpose } from '../api';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreatePurposeRequset, PurposeResponse } from '../types';

export const useCreatePurpose = () => {
  const queryClient = useQueryClient();

  return useMutation<
    PurposeResponse,
    AxiosError<{ message?: string }>,
    CreatePurposeRequset
  >({
    mutationFn: createPurpose,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['purposeList'] });
      alert(
        `새로운 방문 목적 "${variables.purpose}"이(가) 성공적으로 생성되었습니다.`
      );
    },

    onError: (error) => {
      const message =
        error.response?.data?.message ??
        error.message ??
        '방문 목적 생성에 실패하였습니다.';

      alert(message);
    },
  });
};
