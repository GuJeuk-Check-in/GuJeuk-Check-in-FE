import { useQuery } from '@tanstack/react-query';
import { getUserList } from '../api/user.api';

export const useUserList = (page: number) => useQuery({
  queryKey: ['userList', page],
  queryFn: ({ signal }) => getUserList(page, signal),
  retry: false,
});
