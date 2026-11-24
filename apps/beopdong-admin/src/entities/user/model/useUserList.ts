import { useQuery } from '@tanstack/react-query';
import { getUserList } from '../api/user.api';

export const userListQueryKey = ['userList'] as const;

export const useUserList = (page: number) => useQuery({
  queryKey: [...userListQueryKey, page],
  queryFn: ({ signal }) => getUserList(page, signal),
  retry: false,
});
