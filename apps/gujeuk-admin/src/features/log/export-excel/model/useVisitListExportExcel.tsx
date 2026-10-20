/*
  코드 주석 작성일: 2026/10/5
  작성자: 박민건
  이 파일의 전체적인 기능: 엑셀을 다운로드하는 부분이며, 작업의 성공과 실패에 따라서 모달이 달라진다.
*/

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { exportVisitListToExcel } from '@entities/log';
import { UseModalReturn } from '@shared/hooks/useModal';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

type ExportExcelVariables = {
  year: number;
  month: number;
};

// 기능: 작업의 결과가 성공이므로 exportVisitListToExcel을 이용해 엑셀을 다운로드한다.
export const useVisitListExportExcel = (
  modal: UseModalReturn,
): UseMutationResult<string, Error, ExportExcelVariables> => {
  return useMutation<string, Error, ExportExcelVariables>({
    mutationFn: exportVisitListToExcel,
    onSuccess: () => {
      modal.openModal({
        icon: <FaCheckCircle size={48} color="#0F50A0" />,
        title: '엑셀 다운로드',
        subtitle: '엑셀 파일 다운로드가 시작되었습니다. 파일을 확인해 주세요.',
        theme: 'info',
        buttons: [
          {
            label: '확인',
            onClick: modal.closeModal,
          },
        ],
      });
    },
    // 기능: 작업 실패 시 에러와 실패 안내 모달을 표시한다.
    onError: (error) => {
      console.error('엑셀 내보내기 실패:', error);

      modal.openModal({
        icon: <FaExclamationTriangle size={48} color="#D88282" />,
        title: '다운로드 실패',
        subtitle: `엑셀 파일 내보내기에 실패했습니다: ${error.message}`,
        theme: 'warning',
        buttons: [
          {
            label: '확인',
            onClick: modal.closeModal,
          },
        ],
      });
    },
  });
};
