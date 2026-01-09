import axiosInstance from '../common/axiosInstance';
import {
  UserVisitListResponse,
  DeleteUserVisitResponse,
  CreateUserVisitRequest,
  UserVisitDetailResponse,
  ExportVisitListRequest,
  UpdateUserVisitRequest,
} from './types';

export const fetchUserVisitList = async (page = 0) => {
  const response = await axiosInstance.get(`/log?page=${page}`);
  return response.data;
};

export const deleteUserVisit = async (
  id: number
): Promise<DeleteUserVisitResponse> => {
  const response = await axiosInstance.delete(`/log/${id}`);
  return response.data;
};

export const createUserVisit = async (visitData) => {
  const response = await axiosInstance.post(`/log`, visitData);
  return response.data;
};

export const fetchUserVisitDetail = async (
  id: number
): Promise<UserVisitDetailResponse> => {
  try {
    const response = await axiosInstance.get(`/log/${id}`);
    return response.data;
  } catch (error) {
    console.error(`ID ${id} 이용 기록 상세 조회 실패:`, error);
    throw error;
  }
};

export const updateVisitList = async ({
  id,
  ...payload
}: UpdateUserVisitRequest): Promise<UserVisitDetailResponse> => {
  if (!id) {
    throw new Error('수정할 ID가 필요합니다.');
  }

  const response = await axiosInstance.patch(`/log/${id}`, payload);

  return response.data;
};

export const exportVisitListToExcel = async ({
  year,
  month,
}: ExportVisitListRequest): Promise<string> => {
  try {
    const formattedMonth = String(month).padStart(2, '0');

    const response = await axiosInstance.get(
      `/admin/excel/${year}-${formattedMonth}`,
      {
        responseType: 'blob',
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `시설이용목록_${year}-${formattedMonth}.xlsx`
    );
    document.body.appendChild(link);
    link.click();
    link.remove();

    return '엑셀 파일 다운로드 성공';
  } catch (error: any) {
    console.error('엑셀 파일 다운로드 실패:', error);

    let errorMessage = '엑셀 내보내기 중 알 수 없는 오류가 발생했습니다.';

    if (error.response?.status) {
      const status = error.response.status;
      errorMessage = `엑셀 내보내기 실패: ${status} 오류`;

      if (error.response.data) {
        let errorBodyText = '';

        if (error.response.data instanceof Blob) {
          errorBodyText = await error.response.data.text();
        } else if (typeof error.response.data === 'string') {
          errorBodyText = error.response.data;
        }

        if (errorBodyText) {
          const preview =
            errorBodyText.length > 50
              ? errorBodyText.slice(0, 50) + '...'
              : errorBodyText;
          errorMessage += ` (서버 메시지: ${preview})`;
        }
      }
    } else if (error.message) {
      errorMessage = `엑셀 내보내기 실패: ${error.message}`;
    }

    throw new Error(errorMessage);
  }
};
