/*
  코드 주석 작성일: 2026/10/5
  작성자: 박민건
  이 파일의 전체적인 기능: 관리자 페이지에서 특정 방문 기록 데이터를 수정하고, 변경된 데이터가 화면에 바로 반영되도록 기존 캐시 데이터를 최신화하는 커스텀 훅이다.
*/

import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import {
  updateVisitList,
  UpdateUserVisitRequest,
  UserVisitDetailResponse,
} from "@entities/log";
import { AxiosError } from "axios";

interface ServerError {
  message?: string;
}

export const useUpdateAdminItem = (): UseMutationResult<
  UserVisitDetailResponse,
  AxiosError<ServerError>,
  UpdateUserVisitRequest
> => {
  //기능: 수정이 완료된 후 서버의 최신 데이터를 다시 불러와서 화면을 갱신하기 위해 쿼리 클라이언트를 사용한다.
  const queryClient = useQueryClient();

  return useMutation<
    UserVisitDetailResponse,
    AxiosError<ServerError>,
    UpdateUserVisitRequest
  >({
    //기능: 사용자가 updateData를 받아서 사전에 정의된 updateVisitList 호출해 서버에 업데이트 요청을 보낸다.
    mutationFn: (updateData: UpdateUserVisitRequest) =>
      updateVisitList(updateData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["visitDetail", String(variables.id)],
      });
      queryClient.invalidateQueries({ queryKey: ["adminList"] });
    },
  });
};
