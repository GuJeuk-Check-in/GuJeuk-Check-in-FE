import { useMutation } from '@tanstack/react-query';
import { FaExclamationTriangle } from 'react-icons/fa';
import { fetchFacilityUsage } from '@entities/visit';
import type { FacilityUsageRequest } from '@entities/visit';
import { UseModalReturn } from '@shared/hooks/useModal';

export const useFacilityUsageReport = (modal: UseModalReturn) => {
  return useMutation({
    mutationFn: (payload: FacilityUsageRequest) => fetchFacilityUsage(payload),
    onError: (error: Error) => {
      modal.openModal({
        icon: <FaExclamationTriangle />,
        title: '시설 가동률 조회 실패',
        subtitle:
          error.message ||
          '시설 가동률 데이터를 불러오는 중 알 수 없는 오류가 발생했습니다.',
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
