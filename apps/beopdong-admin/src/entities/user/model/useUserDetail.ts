import { useQuery } from '@tanstack/react-query';
import { getUserDetail } from '../api/user.api';

export const userDetailQueryKey = (userId: string) => ['userDetail', userId] as const;

export const useUserDetail = (userId: string) => useQuery({
  queryKey: userDetailQueryKey(userId),
  queryFn: ({ signal }) => getUserDetail(userId, signal),
  retry: false,
});
