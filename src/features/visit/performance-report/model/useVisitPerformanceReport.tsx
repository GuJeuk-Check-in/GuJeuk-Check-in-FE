import { useMutation } from '@tanstack/react-query';
import { FaExclamationTriangle } from 'react-icons/fa';
import { fetchVisitStatistics, VisitStatisticsRequest } from '@entities/visit';
import { UseModalReturn } from '@shared/hooks/useModal';

export const useVisitPerformanceReport = (modal: UseModalReturn) => {
  return useMutation({
    mutationFn: (request: VisitStatisticsRequest) =>
      fetchVisitStatistics(request),
    onError: (error: Error) => {
      modal.openModal({
        icon: <FaExclamationTriangle />,
        title: '월별 실적 조회 실패',
        subtitle:
          error.message ||
          '월별 실적 데이터를 불러오는 중 알 수 없는 오류가 발생했습니다.',
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
