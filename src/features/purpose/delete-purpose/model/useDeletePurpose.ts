import { deletePurpose } from '../../../../api/purpose/api';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeletePurposeList = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ message?: string }>, number>({
    mutationFn: deletePurpose,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purposeList'] });
    },
  });
};
