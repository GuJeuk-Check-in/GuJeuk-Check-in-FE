import {
  useInfiniteQuery,
  useQueries,
  type InfiniteData,
} from '@tanstack/react-query';
import { fetchMonthVisitList, type MonthVisitListResponse } from '@entities/visit';

const MONTH_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

type MonthNumber = (typeof MONTH_NUMBERS)[number];

export interface MonthVisitCountItem {
  readonly month: MonthNumber;
  readonly visitorCount: number;
}

export const useMonthVisitList = (
  year: number,
  options?: { readonly enabled?: boolean }
) => {
  const monthQueries = useQueries({
    queries: MONTH_NUMBERS.map((month) => ({
      queryKey: ['monthVisitList', year, month],
      queryFn: () => fetchMonthVisitList(year, month),
      staleTime: 5 * 60 * 1000,
      enabled: options?.enabled ?? true,
    })),
  });

  const monthVisitCounts: MonthVisitCountItem[] = MONTH_NUMBERS.map(
    (month, index) => ({
      month,
      visitorCount: monthQueries[index]?.data?.totalCount ?? 0,
    })
  );

  return { monthVisitCounts };
};

export const useMonthVisitDetailList = (
  year: number,
  month: number,
  options?: { readonly enabled?: boolean }
) => {
  return useInfiniteQuery<
    MonthVisitListResponse,
    Error,
    InfiniteData<MonthVisitListResponse>,
    ['monthVisitDetailList', number, number],
    number
  >({
    queryKey: ['monthVisitDetailList', year, month],
    queryFn: ({ pageParam = 0 }) => fetchMonthVisitList(year, month, pageParam),
    staleTime: 5 * 60 * 1000,
    enabled: options?.enabled ?? true,
    getNextPageParam: (lastPage) => {
      const slice = lastPage?.slice;
      if (!slice || slice.last || !slice.content?.length) return undefined;
      return slice.number + 1;
    },
    initialPageParam: 0,
  });
};
