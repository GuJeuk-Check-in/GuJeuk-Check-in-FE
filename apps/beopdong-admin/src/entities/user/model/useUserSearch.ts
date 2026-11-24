import { useQuery } from '@tanstack/react-query';
import { searchUsers } from '../api/user.api';

export const userSearchQueryKey = ['userSearch'] as const;

export const useUserSearch = (name: string) => useQuery({
  queryKey: [...userSearchQueryKey, name],
  queryFn: ({ signal }) => searchUsers(name, signal),
  enabled: name !== '',
  retry: false,
});
