import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserInformation } from '@entities/user/api/user.api';
import { UserInformation } from '@entities/user';

export const useUpdateUserInformation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Omit<UserInformation, 'id'>;
    }) => updateUserInformation(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['user', String(data.id)],
      });
    },
  });
};
