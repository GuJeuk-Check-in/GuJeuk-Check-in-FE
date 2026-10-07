/*
  코드 주석 작성일: 2026/10/5
  작성자: 박민건
  이 파일의 전체적인 기능: 선택한 연도와 월의 방문 실적 통계 데이터를 서버에서 조회하고 에러 모달 팝업을 띄워주는 훅 파일이다.
*/

import { useMutation } from "@tanstack/react-query";
import { FaExclamationTriangle } from "react-icons/fa";
import { fetchVisitStatistics, VisitStatisticsRequest } from "@entities/log";
import { UseModalReturn } from "@shared/hooks/useModal";

//error객체에 status가 있는지 확인하고 status가 number 형인지 체크하는 타입 가드
const hasHttpStatus = (error: Error): error is Error & { status: number } =>
  "status" in error && typeof error.status === "number";

//기능: 에러 모달에서 띄울 에러메세지를 HTTP Status 혹은 isMissingMonthlyPerformance를 이용해 에러 메세지를 반환한다.
const getVisitPerformanceErrorMessage = (
  error: Error,
  request: VisitStatisticsRequest,
) => {
  const isMissingMonthlyPerformance =
    (hasHttpStatus(error) && error.status === 400) ||
    error.message.includes("유효하지 않은 날짜 형식");

  if (isMissingMonthlyPerformance) {
    return `아직 ${request.year}년 ${request.month}월의 실적이 존재하지 않습니다.`;
  }

  return (
    error.message ||
    "월별 실적 데이터를 불러오는 중 알 수 없는 오류가 발생했습니다."
  );
};

//기능: 에러 모달을 구성하는 훅이고 실적 조회 실패 시 에러 원인에 맞는 안내 메시지를 화면에 띄운다.
export const useVisitPerformanceReport = (modal: UseModalReturn) => {
  return useMutation({
    mutationFn: (request: VisitStatisticsRequest) =>
      fetchVisitStatistics(request),
    onError: (error: Error, request) => {
      modal.openModal({
        icon: <FaExclamationTriangle />,
        title: "월별 실적 조회 실패",
        subtitle: getVisitPerformanceErrorMessage(error, request),
        theme: "warning",
        buttons: [
          {
            label: "확인",
            variant: "primary",
            onClick: modal.closeModal,
          },
        ],
      });
    },
  });
};
