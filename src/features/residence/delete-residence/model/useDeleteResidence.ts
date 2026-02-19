import { deleteResidence } from '@entities/residence/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useDeleteResidence = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ message?: string }>, number>({
    mutationFn: deleteResidence,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['residenceList'] });
    },
  });
};
