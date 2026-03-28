import { useQueries, useQuery } from '@tanstack/react-query';
import { fetchMonthVisitList } from '@entities/visit';

type MonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface MonthVisitCountItem {
  month: MonthNumber;
  visitorCount: number;
}

export const useMonthVisitList = (
  year: number,
  options?: { enabled?: boolean }
) => {
  const monthQueries = useQueries({
    queries: Array.from({ length: 12 }, (_, index) => {
      const month = (index + 1) as MonthNumber;

      return {
        queryKey: ['monthVisitList', year, month],
        queryFn: () => fetchMonthVisitList(year, month),
        staleTime: 5 * 60 * 1000,
        enabled: options?.enabled ?? true,
      };
    }),
  });

  const monthVisitCounts: MonthVisitCountItem[] = monthQueries.map(
    (query, index) => ({
      month: (index + 1) as MonthNumber,
      visitorCount: query.data?.totalCount ?? 0,
    })
  );

  return { monthVisitCounts };
};

export const useMonthVisitDetailList = (
  year: number,
  month: number,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ['monthVisitList', year, month],
    queryFn: () => fetchMonthVisitList(year, month),
    staleTime: 5 * 60 * 1000,
    enabled: options?.enabled ?? true,
  });
};
