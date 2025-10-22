import { useQuery } from '@tanstack/react-query';
import { userList, usersByResidence } from '../api/userApi';

export const useUserList = (page, residence) => {
  const queryKey = ['userList', { page, residence }];

  const queryFn = () => {
    if (residence) {
      return usersByResidence(residence);
    } else {
      return userList(page);
    }
  };

  return useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });
};
