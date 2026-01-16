import { useInfiniteQuery } from '@tanstack/react-query';
import { userList, usersByResidence } from '@entities/user/api/user.api';
import { NormalizedUserPage } from '@entities/user/index';
import { AxiosError } from 'axios';

interface UseUserListParams {
  residence?: string | null;
}

export const useInfiniteUserList = ({ residence }: UseUserListParams) => {
  return useInfiniteQuery<NormalizedUserPage, AxiosError>({
    queryKey: ['userList', residence ?? 'all'],
    initialPageParam: 0,

    queryFn: async ({ pageParam = 0 }) => {
      const currentPage = pageParam as number;

      const res = residence
        ? await usersByResidence(residence, currentPage)
        : await userList(currentPage);

      return {
        users: res.slice?.content || res.users || [],
        totalCount: res.totalCount,
        last: res.slice?.last ?? true,
        page: res.slice?.number ?? 0,
      };
    },

    getNextPageParam: (lastPage) => {
      if (lastPage.last) return undefined;
      return lastPage.page + 1;
    },

    staleTime: 5 * 60 * 1000,
  });
};
