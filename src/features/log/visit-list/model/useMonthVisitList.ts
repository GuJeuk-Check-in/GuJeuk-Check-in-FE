/*
  코드 주석 작성일: 2026/10/5
  작성자: 박민건
  이 파일의 전체적인 기능: 특정 연도의 1월부터 12월까지의 월별 방문자 통계 데이터(건수)를 한 번에 조회하는 기능이다
*/

import {
  useInfiniteQuery,
  useQueries,
  type InfiniteData,
} from "@tanstack/react-query";
import {
  fetchMonthVisitList,
  type MonthVisitListResponse,
} from "@entities/log";

const MONTH_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

type MonthNumber = (typeof MONTH_NUMBERS)[number];

export interface MonthVisitCountItem {
  readonly month: MonthNumber;
  readonly visitorCount: number;
}

export const useMonthVisitList = (
  year: number,
  options?: { readonly enabled?: boolean },
) => {
  //기능: MONTH_NUMBERS 안에 value들을 매핑하여서 매핑하는 동안에 year, month의 쿼리키를 만들고 300초 동안 신선한 데이터로 유지 시킨다.
  const monthQueries = useQueries({
    queries: MONTH_NUMBERS.map((month) => ({
      queryKey: ["monthVisitList", year, month],
      queryFn: () => fetchMonthVisitList(year, month),
      staleTime: 5 * 60 * 1000,
      enabled: options?.enabled ?? true,
    })),
  });

  //기능: 만약 1월 부터 12월까지 나열하면서 총 방문자 수까지 나열하는데 서버에서 요청을 받다가 에러가 나면 0으로 처리한다.
  const monthVisitCounts: MonthVisitCountItem[] = MONTH_NUMBERS.map(
    (month, index) => ({
      month,
      visitorCount: monthQueries[index]?.data?.totalCount ?? 0,
    }),
  );

  return { monthVisitCounts };
};

//기능:  지정한 연도와 월의 방문 상세 목록을 페이지 단위로 조회하는 훅이다.
export const useMonthVisitDetailList = (
  year: number,
  month: number,
  options?: { readonly enabled?: boolean },
) => {
  return useInfiniteQuery<
    MonthVisitListResponse,
    Error,
    InfiniteData<MonthVisitListResponse>,
    ["monthVisitDetailList", number, number],
    number
  >({
    //기능: monthVisitDetailList, year, month의 쿼리키를 만들고 300초 동안 신선한 데이터로 유지 시킨다.
    queryKey: ["monthVisitDetailList", year, month],
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
