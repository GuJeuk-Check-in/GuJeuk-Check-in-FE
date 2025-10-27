import { updateVisitList } from '../api/visitApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateAdminItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateVisitList,
    onSuccess: (data, variables) => {
      console.log('Update successful:', data);
      queryClient.invalidateQueries({ queryKey: ['adminList'] });
      queryClient.invalidateQueries({ queryKey: ['adminItem', variables.id] });
    },
    onError: (error) => {
      console.error('Update failed:', error);
    },
  });
};
