import { useCallback } from 'react';
import { useInfiniteQuery, useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { deleteVisit, getVisits, toVisitSummary, type UserVisitSummary } from '@entities/log';
import { usePurposeOptions } from '@entities/purpose';

interface ServerError {
  message?: string;
}

interface VisitListPage {
  visits: UserVisitSummary[];
  page: number;
  last: boolean;
}

export const useInfiniteUserVisitList = () => {
  const { options, isLoading: isPurposeLoading, isError: isPurposeError, errorUpdatedAt: purposeErrorUpdatedAt, refetch: refetchPurposes } =
    usePurposeOptions();
  const select = useCallback(
    (data: InfiniteData<Awaited<ReturnType<typeof getVisits>>, number>): InfiniteData<VisitListPage, number> => ({
      pageParams: data.pageParams,
      pages: data.pages.map((response) => ({
        visits: response.content.map((dto) => toVisitSummary(dto, options)),
        page: response.pageable.pageNumber,
        last: response.last,
      })),
    }),
    [options]
  );

  const query = useInfiniteQuery({
    queryKey: ['visitList'],
    queryFn: ({ pageParam }) => getVisits(pageParam),
    select,
    enabled: !isPurposeLoading,
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
    getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.pageable.pageNumber + 1),
  });

  const refetch = async () => {
    if (isPurposeError) await refetchPurposes();
    return query.refetch();
  };

  return {
    ...query,
    refetch,
    isError: query.isError || isPurposeError,
    errorUpdatedAt: Math.max(query.errorUpdatedAt, purposeErrorUpdatedAt),
    isLoading: query.isLoading || isPurposeLoading,
  };
};

export const useDeleteVisitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ServerError>, UserVisitSummary>({
    mutationFn: (visit) => deleteVisit(visit.id),
    onSuccess: (_, visit) => {
      queryClient.removeQueries({ queryKey: ['visitDetail', visit.id] });
      return queryClient.invalidateQueries({ queryKey: ['visitList'] });
    },
  });
};
