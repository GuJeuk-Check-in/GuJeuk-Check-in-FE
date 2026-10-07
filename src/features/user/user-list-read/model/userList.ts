import { useInfiniteQuery } from '@tanstack/react-query';
import { userList, usersByResidence } from '@entities/user/api/user.api';
import { NormalizedUserPage } from '@entities/user';
import { AxiosError } from 'axios';

interface UseUserListParams {
  residence?: string | null;
}

//  UserListSearch 위젯이 이 훅을 사용
// 유저 리스트 무한스크롤 로직
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
        users: res.slice?.content || [],
        totalCount: res.totalCount,
        last: res.slice?.last ?? true,
        page: res.slice?.number ?? 0,
      };
    },
// last 플래그가 true면 undefined 출력, 아니면 다음 페이지 번호 반환
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return undefined;
      return lastPage.page + 1;
    },

    staleTime: 5 * 60 * 1000,
  });
};
