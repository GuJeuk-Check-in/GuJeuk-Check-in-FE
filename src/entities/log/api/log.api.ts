import {
  axiosInstance,
  downloadBlobFile,
  readErrorBodyPreview,
} from '@shared/api';
import { isAxiosError } from 'axios';
import type {
  CreateUserVisitRequest,
  DeleteUserVisitResponse,
  FacilityUsageRequest,
  FacilityUsageResponse,
  MonthVisitListResponse,
  UserVisitDetailResponse,
  UserVisitListResponse,
  ExportVisitListRequest,
  UpdateUserVisitRequest,
  VisitStatisticsRequest,
  VisitStatisticsResponse,
} from '../model/types';

export const fetchUserVisitList = async (
  page = 0
): Promise<UserVisitListResponse> => {
  const response = await axiosInstance.get<UserVisitListResponse>(
    `/log?page=${page}`
  );
  return response.data;
};

export const fetchMonthVisitList = async (
  year: number,
  month: number,
  page = 0
): Promise<MonthVisitListResponse> => {
  const formattedMonth = String(month).padStart(2, '0');
  const response = await axiosInstance.get<MonthVisitListResponse>(
    `/log/date/${year}-${formattedMonth}?page=${page}`
  );
  return response.data;
};

export const deleteUserVisit = async (
  id: number
): Promise<DeleteUserVisitResponse> => {
  const response = await axiosInstance.delete(`/log/${id}`);
  return response.data;
};

export const createUserVisit = async (
  visitData: CreateUserVisitRequest
): Promise<UserVisitDetailResponse> => {
  const response = await axiosInstance.post(`/log`, {
    ...visitData,
  });
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
  const response = await axiosInstance.patch(`/log/${id}`, payload);

  return response.data;
};

// 특정 월의 방문 기록을 엑셀 파일로 다운로드
export const exportVisitListToExcel = async ({
  year,
  month,
}: ExportVisitListRequest): Promise<string> => { // 응답은 string 타입으로 지정
  try {
    const formattedMonth = String(month).padStart(2, '0'); // 월을 두 자리 숫자로 포맷팅 

    const response = await axiosInstance.get<Blob>(
      `/organ/excel/log/${year}-${formattedMonth}`,
      {
        responseType: 'blob',
      }
    );

    downloadBlobFile(
      response.data,
      `시설이용목록_${year}-${formattedMonth}.xlsx` // 다운로드 파일 이름 지정
    );

    return '엑셀 파일 다운로드 성공';
  } catch (error: unknown) {
    console.error('엑셀 파일 다운로드 실패:', error);

    let errorMessage = '엑셀 내보내기 중 알 수 없는 오류가 발생했습니다.';

    if (isAxiosError(error) && error.response?.status) { // Axios 에러인 경우 HTTP 상태 코드와 서버 메시지 확인
      const status = error.response.status;
      errorMessage = `엑셀 내보내기 실패: ${status} 오류`;

      const preview = await readErrorBodyPreview(error.response.data); // 서버 응답 데이터에서 에러 메시지 미리보기 읽기

      if (preview) {
        errorMessage += ` (서버 메시지: ${preview})`; // 서버에서 제공하는 에러 메시지가 있는 경우 추가
      }
    } else if (error instanceof Error && error.message) { // 일반적인 Error인 경우 에러 메시지 사용
      errorMessage = `엑셀 내보내기 실패: ${error.message}`;
    }

    throw new Error(errorMessage);
  }
};

export const fetchVisitStatistics = async ({
  year,
  month,
}: VisitStatisticsRequest): Promise<VisitStatisticsResponse> => {
  const response = await axiosInstance.get('/organ/statistics/visits', {
    params: {
      year,
      month,
    },
  });

  return response.data;
};

export const fetchFacilityUsage = async ({
  year,
}: FacilityUsageRequest): Promise<FacilityUsageResponse> => {
  const response = await axiosInstance.get('/organ/usage', {
    params: {
      year,
    },
  });

  return response.data;
};
