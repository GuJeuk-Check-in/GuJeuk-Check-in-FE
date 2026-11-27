import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  prepareUserUpdate, updateUser, userDetailQueryKey, userListQueryKey, userSearchQueryKey, type UpdateUserRequest, type UserDetail,
} from '@entities/user';

export const useUpdateUser = (userId: string) => {
  const queryClient = useQueryClient();
  const detailQueryKey = userDetailQueryKey(userId);

  return useMutation({
    mutationFn: async (draft: UpdateUserRequest) => {
      const request = prepareUserUpdate(draft);
      await updateUser(userId, request);
      return request;
    },
    scope: { id: `update-user:${userId}` },
    onSuccess: async ({ schoolType: _schoolType, ...detail }) => {
      await queryClient.cancelQueries({ queryKey: detailQueryKey });
      queryClient.setQueryData<UserDetail>(detailQueryKey, (previous) => ({ ...previous, ...detail }));
      void queryClient.invalidateQueries({ queryKey: userListQueryKey });
      void queryClient.invalidateQueries({ queryKey: userSearchQueryKey });
    },
  });
};
