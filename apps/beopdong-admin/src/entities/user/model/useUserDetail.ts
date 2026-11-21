import { useQuery } from '@tanstack/react-query';
import { getUserDetail } from '../api/user.api';

export const useUserDetail = (userId: string) => useQuery({
  queryKey: ['userDetail', userId],
  queryFn: ({ signal }) => getUserDetail(userId, signal),
  retry: false,
});
