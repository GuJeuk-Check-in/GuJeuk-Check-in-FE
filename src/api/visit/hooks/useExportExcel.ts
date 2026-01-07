import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { exportVisitListToExcel } from '../api';

type ExportExcelVariables = {
  year: number;
  month: number;
};

export const useExportExcel = (): UseMutationResult<
  string,
  Error,
  ExportExcelVariables
> => {
  return useMutation<string, Error, ExportExcelVariables>({
    mutationFn: exportVisitListToExcel,
    onSuccess: () => {
      alert('엑셀 파일 다운로드가 시작되었습니다. 파일을 확인해 주세요.');
    },
    onError: (error) => {
      console.error('엑셀 내보내기 실패:', error);

      alert(`엑셀 파일 내보내기에 실패했습니다: ${error.message}`);
    },
  });
};
