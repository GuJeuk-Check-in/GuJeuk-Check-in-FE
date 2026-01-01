import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { fetchUserVisitList, deleteUserVisit } from '../visitApi';

export const useInfiniteUserVisitList = () => {
  return useInfiniteQuery({
    queryKey: ['visits'],
    queryFn: ({ pageParam = 0 }) => fetchUserVisitList(pageParam),
    staleTime: 5 * 60 * 1000,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.last === true) return undefined;
      if (!lastPage.content || lastPage.content.length === 0) return undefined;
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
    },
    onError: (error) => {
      console.error('삭제 실패:', error);
      alert(`삭제 실패: ${error.message}`);
    },
  });
};
