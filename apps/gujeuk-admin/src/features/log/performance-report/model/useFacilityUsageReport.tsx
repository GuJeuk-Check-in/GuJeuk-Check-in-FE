import { useMutation } from '@tanstack/react-query';
import { FaExclamationTriangle } from 'react-icons/fa';
import { fetchFacilityUsage } from '@entities/log';
import type { FacilityUsageRequest } from '@entities/log';
import { UseModalReturn } from '@shared/hooks/useModal';

export const useFacilityUsageReport = (modal: UseModalReturn) => {
  return useMutation({
    mutationFn: (payload: FacilityUsageRequest) => fetchFacilityUsage(payload), // fetchFacilityUsage 함수를 호출하여 시설 이용률 데이터를 가져오는 요청
    onError: (error: Error) => {
      modal.openModal({
        // 에러 발생 시 모달을 열어 사용자에게 에러 메시지를 보여줌
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
