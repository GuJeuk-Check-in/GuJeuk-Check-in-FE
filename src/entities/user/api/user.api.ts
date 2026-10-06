import {
  axiosInstance,
  downloadBlobFile,
  readErrorBodyPreview,
} from '@shared/api';
import { isAxiosError } from 'axios';
import type { UserListResponse, UserInformation } from '../model/types';

// 전체 사용자 목록 조회
export const userList = async (page = 0): Promise<UserListResponse> => {
  const response = await axiosInstance.get<UserListResponse>(
    '/organ/user/all',
    {
      params: { page },
    }
  );
  return response.data;
};

// 특정 사용자 정보 조회
export const fetchUserInformation = async (
  userId: string
): Promise<UserInformation> => {
  const response = await axiosInstance.get(`/organ/user/${userId}`);
  return response.data;
};

// 특정 사용자 정보 수정
export const updateUserInformation = async (
  id: number,
  data: Omit<UserInformation, 'id'>
) => {
  const response = await axiosInstance.patch(`/organ/user/${id}`, data);
  return response.data;
};

export const usersByResidence = async (
  residence: string,
// 거주 지역별 사용자 목록 조회
  page = 0
): Promise<UserListResponse> => {
  const residenceParam = residence === '기타 지역' ? '기타' : residence;

  const response = await axiosInstance.get<UserListResponse>('/organ/user', {
    params: { residence: residenceParam, page },
  });

  return response.data;
};

export const exportUserListToExcel = async (): Promise<string> => {
// 회원 목록을 엑셀 파일로 다운로드
  try {
    const response = await axiosInstance.get<Blob>(`/organ/excel/user`, {
    // 서버에서 엑셀 파일 데이터 요청
      responseType: 'blob',
    });

    downloadBlobFile(response.data, `회원 목록.xlsx`);
    // 받은 파일을 다운로드

    return '엑셀 파일 다운로드 성공';
  } catch (error: unknown) {
    console.error('엑셀 파일 다운로드 실패:', error);

    let errorMessage = '엑셀 내보내기 중 알 수 없는 오류가 발생했습니다.';

    if (isAxiosError(error) && error.response?.status) {
      const status = error.response.status;
    // Axios 에러인 경우 HTTP 상태 코드와 서버 메시지 확인
      errorMessage = `엑셀 내보내기 실패: ${status} 오류`;

      const preview = await readErrorBodyPreview(error.response.data);

      if (preview) {
        errorMessage += ` (서버 메시지: ${preview})`;
      }
    } else if (error instanceof Error && error.message) {
      errorMessage = `엑셀 내보내기 실패: ${error.message}`;
      // 일반적인 Error인 경우 에러 메시지 사용
    }

    throw new Error(errorMessage);
  }
};
