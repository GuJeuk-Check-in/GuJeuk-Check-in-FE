import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserInformation } from '@entities/user/api/user.api';
import { UserInformation } from '@entities/user/index';

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
