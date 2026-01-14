import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserInformation } from '../api';
import { UserInformation } from '../types';

export const useUpdateUserInformation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserInformation) => updateUserInformation(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['user', data.userId],
      });
    },
  });
};
