/*
  코드 주석 작성일: 2026/10/5
  작성자: 박민건
  이 파일의 전체적인 기능: 사용자 방문 목록을 페이지 단위로 조회하고, 선택한 방문 기록을 삭제한다.
*/

import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  type InfiniteData,
} from "@tanstack/react-query";
import {
  fetchUserVisitList,
  deleteUserVisit,
  type UserVisitListResponse,
} from "@entities/log";
import type { AxiosError } from "axios";

interface ServerError {
  message?: string;
}

//기능: 지정한 연도와 월의 방문 상세 목록을 페이지 단위로 조회하는 훅이다.
export const useInfiniteUserVisitList = (options?: { enabled?: boolean }) => {
  return useInfiniteQuery<
    UserVisitListResponse,
    AxiosError,
    InfiniteData<UserVisitListResponse>,
    ["visitList"],
    number
  >({
    //기능: visitList 쿼리키를 만들고 300초 동안 신선하게 유지한다.
    queryKey: ["visitList"],
    queryFn: ({ pageParam = 0 }) => fetchUserVisitList(pageParam),
    staleTime: 5 * 60 * 1000,
    enabled: options?.enabled !== false,
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.last) return undefined;
      if (!lastPage.content?.length) return undefined;
      return lastPage.number + 1;
    },
    initialPageParam: 0,
  });
};

// 기능: 방문 기록을 삭제하고, 삭제 성공 시 관련 목록의 캐시를 정리한다.
export const useDeleteVisitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<string, AxiosError<ServerError>, number>({
    mutationFn: (id: number) => deleteUserVisit(id),
    onSuccess: () => {
      //기능: 성공하게 되면 visitList, monthVisitList, mothVisitDetailList의 쿼리키를 지우게 된다.
      queryClient.removeQueries({ queryKey: ["visitList"] });
      queryClient.invalidateQueries({ queryKey: ["monthVisitList"] });
      queryClient.invalidateQueries({ queryKey: ["monthVisitDetailList"] });
    },
  });
};
