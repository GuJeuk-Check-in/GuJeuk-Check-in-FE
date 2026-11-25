import { deletePurpose, usePurposeStore } from '@entities/purpose';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeletePurposeList = () => {
  const queryClient = useQueryClient();
  const setSubPurposes = usePurposeStore((state) => state.setSubPurposes);

  return useMutation<void, AxiosError<{ message?: string }>, number>({
    mutationFn: deletePurpose,
    onSuccess: (_, id) => {
      setSubPurposes(id, []);
      queryClient.invalidateQueries({ queryKey: ['purposeList'] });
    },
  });
};
