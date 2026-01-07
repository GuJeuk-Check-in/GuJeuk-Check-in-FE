import { useQuery } from '@tanstack/react-query';
import { userList, usersByResidence } from '../api';
import type { UserListResponse } from '../types';

interface UseUserListParams {
  page?: number;
  residence?: string | null;
}

export const useUserList = ({
  page = 0,
  residence = null,
}: UseUserListParams) => {
  const isResidenceFilterActive = !!residence && residence !== '전체 지역';

  return useQuery<UserListResponse>({
    queryKey: ['userList', page, residence],
    queryFn: () => {
      if (isResidenceFilterActive) {
        return usersByResidence(residence);
      }
      return userList(page);
    },
    staleTime: 5 * 60 * 1000,
  });
};
