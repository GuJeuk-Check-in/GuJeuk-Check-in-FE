import { useQuery } from '@tanstack/react-query';
import { fetchUserInformation } from '../api/user.api';

// fetchUserInformation을 감싸는 조회 훅
export const useFetchUserInformation = (userId?: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUserInformation(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};
