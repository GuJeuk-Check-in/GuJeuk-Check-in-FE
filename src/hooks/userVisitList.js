import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { fetchUserVisitList, deleteUserVisit } from '../api/visitApi';

export const useInfiniteUserVisitList = () => {
  return useInfiniteQuery({
    queryKey: ['visits'],
    queryFn: ({ pageParam = 0 }) => fetchUserVisitList(pageParam),
    staleTime: 5 * 60 * 1000,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.last) {
        return undefined;
      }
      return allPages.length;
    },

    initialPageParam: 0,
  });
};

export const useDeleteVisitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserVisit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visits'] });
      alert('이용 기록이 성공적으로 삭제되었습니다.');
    },
    onError: (error) => {
      alert(`삭제 실패: ${error.message}`);
    },
  });
};
