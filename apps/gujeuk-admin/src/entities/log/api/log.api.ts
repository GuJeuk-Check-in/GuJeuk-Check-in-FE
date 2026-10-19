/*
  코드 주석 작성일: 2026/09/27
  작성자: 박민건
  이 파일의 전체적인 기능: 사용자 이용 기록에 관한 api 연동 로직을 맏고 있다.
*/

// 가능: 이 파일안에서 작성 api 로직에 필요한 것들을 가져온다.
import {
  axiosInstance,
  downloadBlobFile,
  readErrorBodyPreview,

// 기능: axios안에 내장되어 있는 isAxiosError를 이용해 api 연동에 문제를 발견하였을 떄 메세지를 전달한다.
} from '@shared/api';

// 기능: api 로직을 짤 때 필요한 내용들의 타입을 선언한 것들 가져온다.
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
// 기능: User가 다녀간 이용 기록 목록을 페이지 단위로 가져온다.

export const fetchUserVisitList = async (
  page = 0
): Promise<UserVisitListResponse> => {
  const response = await axiosInstance.get<UserVisitListResponse>(
    `/log?page=${page}`
  );
  return response.data;
};
// 기능: 이번 달 이용 기록 목록을 페이지 단위로 가져온다.

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
// 기능: 시용자의 id에 따른 이용 기록을 삭제한다.

export const deleteUserVisit = async (
  id: number
): Promise<DeleteUserVisitResponse> => {
  const response = await axiosInstance.delete(`/log/${id}`);
  return response.data;
};
// 기능: 사용자의 이용 기록을 추가한다.

export const createUserVisit = async (
  visitData: CreateUserVisitRequest
): Promise<UserVisitDetailResponse> => {
  const response = await axiosInstance.post(`/log`, {
    ...visitData,
  });
  return response.data;
};
//기능: 사용자 id에 따른 이용 기록을 상세로 확인한다.

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
// 기능:  사용자 id에 따른 이용 기록을 수정하는 기능이다

export const updateVisitList = async ({
  id,
  ...payload
}: UpdateUserVisitRequest): Promise<UserVisitDetailResponse> => {
  const response = await axiosInstance.patch(`/log/${id}`, payload);

  return response.data;
};
// 기능: 이용 기록에 대한 엑셀을 내보낼 떄의 엑셀 이름과 내용을 담는다. 또한 blob 객체를 이용해 액셀을 다운로드 받을 수 있게한다.

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
// 기능: 방문자 통계를 가져온다.

// 방문 통계 조회
export const fetchVisitStatistics = async ({
  year,
  month,
}: VisitStatisticsRequest): Promise<VisitStatisticsResponse> => { // 응답은 VisitStatisticsResponse 타입으로 지정
  const response = await axiosInstance.get('/organ/statistics/visits', {
    params: {
      year,
      month,
    },
  });

  return response.data;
};
// 기능: 시설의 이용 내역을 가져온다.

// 시설 이용 통계 조회
export const fetchFacilityUsage = async ({
  year,
}: FacilityUsageRequest): Promise<FacilityUsageResponse> => { // 응답은 FacilityUsageResponse 타입으로 지정
  const response = await axiosInstance.get('/organ/usage', {
    params: {
      year,
    },
  });

  return response.data;
};
