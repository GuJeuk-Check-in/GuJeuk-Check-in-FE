import {
  axiosInstance,
  downloadBlobFile,
  publicAxiosInstance,
  readErrorBodyPreview,
} from '@shared/api';
import { isAxiosError } from 'axios';
import type {
  CheckUserRequest,
  CheckUserResponse,
  CreateUserVisitRequest,
  DeleteUserVisitResponse,
  FacilityUsageRequest,
  ExistingUserCheckInRequest,
  FacilityUsageResponse,
  MonthVisitListResponse,
  UserVisitDetailResponse,
  UserVisitListResponse,
  ExportVisitListRequest,
  NewUserSignUpRequest,
  UpdateUserVisitRequest,
  VisitStatisticsRequest,
  VisitStatisticsResponse,
} from '../model/types';

export const checkUserExists = async (
  payload: CheckUserRequest
): Promise<CheckUserResponse> => {
  const response = await publicAxiosInstance.post<CheckUserResponse>(
    '/user',
    payload
  );
  return response.data;
};

export const signUpPublicUser = async (
  payload: NewUserSignUpRequest
): Promise<void> => {
  await publicAxiosInstance.post('/user/sign-up', payload);
};

export const createExistingUserCheckIn = async (
  payload: ExistingUserCheckInRequest
): Promise<void> => {
  await publicAxiosInstance.post('/user/check-in', payload);
};

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

export const createPublicUserVisit = async (
  visitData: CreateUserVisitRequest
): Promise<UserVisitDetailResponse> => {
  const response = await publicAxiosInstance.post('/check-in', visitData);
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

export const exportVisitListToExcel = async ({
  year,
  month,
}: ExportVisitListRequest): Promise<string> => {
  try {
    const formattedMonth = String(month).padStart(2, '0');

    const response = await axiosInstance.get<Blob>(
      `/organ/excel/log/${year}-${formattedMonth}`,
      {
        responseType: 'blob',
      }
    );

    downloadBlobFile(
      response.data,
      `시설이용목록_${year}-${formattedMonth}.xlsx`
    );

    return '엑셀 파일 다운로드 성공';
  } catch (error: unknown) {
    console.error('엑셀 파일 다운로드 실패:', error);

    let errorMessage = '엑셀 내보내기 중 알 수 없는 오류가 발생했습니다.';

    if (isAxiosError(error) && error.response?.status) {
      const status = error.response.status;
      errorMessage = `엑셀 내보내기 실패: ${status} 오류`;

      const preview = await readErrorBodyPreview(error.response.data);

      if (preview) {
        errorMessage += ` (서버 메시지: ${preview})`;
      }
    } else if (error instanceof Error && error.message) {
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
