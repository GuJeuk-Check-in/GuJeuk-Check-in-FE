import { useMutation } from '@tanstack/react-query';
import { FaExclamationTriangle } from 'react-icons/fa';
import { fetchVisitStatistics, VisitStatisticsRequest } from '@entities/log';
import { UseModalReturn } from '@shared/hooks/useModal';

const hasHttpStatus = (error: Error): error is Error & { status: number } =>
  'status' in error && typeof error.status === 'number';

const getVisitPerformanceErrorMessage = (
  error: Error,
  request: VisitStatisticsRequest
) => {
  const isMissingMonthlyPerformance =
    (hasHttpStatus(error) && error.status === 400) ||
    error.message.includes('유효하지 않은 날짜 형식');

  if (isMissingMonthlyPerformance) {
    return `아직 ${request.year}년 ${request.month}월의 실적이 존재하지 않습니다.`;
  }

  return (
    error.message ||
    '월별 실적 데이터를 불러오는 중 알 수 없는 오류가 발생했습니다.'
  );
};

export const useVisitPerformanceReport = (modal: UseModalReturn) => {
  return useMutation({
    mutationFn: (request: VisitStatisticsRequest) =>
      fetchVisitStatistics(request),
    onError: (error: Error, request) => {
      modal.openModal({
        icon: <FaExclamationTriangle />,
        title: '월별 실적 조회 실패',
        subtitle: getVisitPerformanceErrorMessage(error, request),
        theme: 'warning',
        buttons: [
          {
            label: '확인',
            variant: 'primary',
            onClick: modal.closeModal,
          },
        ],
      });
    },
  });
};
