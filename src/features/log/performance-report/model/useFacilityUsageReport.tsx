/*
  코드 주석 작성일: 2026/10/5
  작성자: 박민건
  이 파일의 전체적인 기능: 특정 기간의 시설 가동률 데이터를 서버에서 가져오는 요청에서 에러가 발생하면 경고 매세지모달 창을 띄워주는 훅 파일이다.
*/

import { useMutation } from '@tanstack/react-query';
import { FaExclamationTriangle } from 'react-icons/fa';
import { fetchFacilityUsage } from '@entities/log';
import type { FacilityUsageRequest } from '@entities/log';
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
