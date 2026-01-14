import { useQuery } from '@tanstack/react-query';
import { fetchUserInformation } from '../api';

export const useFetchUserInformation = (userId?: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUserInformation(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};
