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

export const useVisitListExportExcel = (
  modal: UseModalReturn
): UseMutationResult<string, Error, ExportExcelVariables> => {
  return useMutation<string, Error, ExportExcelVariables>({
    //기능: 작업의 결과가 성공이므로 전에 만들어 놨던 exportVisitListToExcel을 이용하여서 엑셀 파일을 다운로드 받을 수 있다.
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

    //기능: 작업의 결과가 실패이므로 실패에 따른 콘솔 창에 에러와 살패 모달 창을 띄운다. 
    },
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
