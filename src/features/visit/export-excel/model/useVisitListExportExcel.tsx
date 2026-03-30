import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { exportVisitListToExcel } from '@entities/visit/index';
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
