import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { deleteVisit, getVisits, toVisitSummary, type UserVisitSummary } from '@entities/log';

interface ServerError {
  message?: string;
}

export const useInfiniteUserVisitList = () =>
  useInfiniteQuery({
    queryKey: ['visitList'],
    queryFn: async ({ pageParam }) => {
      const response = await getVisits(pageParam);
      return {
        visits: response.content.map(toVisitSummary),
        page: response.pageable.pageNumber,
        last: response.last,
      };
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
    getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.page + 1),
  });

export const useDeleteVisitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ServerError>, UserVisitSummary>({
    mutationFn: (visit) => deleteVisit(visit.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['visitList'] }),
  });
};
