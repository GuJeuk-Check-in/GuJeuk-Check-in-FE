import {
  axiosInstance,
  downloadBlobFile,
  readErrorBodyPreview,
} from '@shared/api';
import { isAxiosError } from 'axios';
import type { UserListResponse, UserInformation } from '../model/types';

export const userList = async (page = 0): Promise<UserListResponse> => {
  const response = await axiosInstance.get<UserListResponse>(
    '/organ/user/all',
    {
      params: { page },
    }
  );
  return response.data;
};

export const fetchUserInformation = async (
  userId: string
): Promise<UserInformation> => {
  const response = await axiosInstance.get(`/organ/user/${userId}`);
  return response.data;
};

export const updateUserInformation = async (
  id: number,
  data: Omit<UserInformation, 'id'>
) => {
  const response = await axiosInstance.patch(`/organ/user/${id}`, data);
  return response.data;
};

export const usersByResidence = async (
  residence: string,
  page = 0
): Promise<UserListResponse> => {
  const residenceParam = residence === '기타 지역' ? '기타' : residence;

  const response = await axiosInstance.get<UserListResponse>('/organ/user', {
    params: { residence: residenceParam, page },
  });

  return response.data;
};

export const exportUserListToExcel = async (): Promise<string> => {
  try {
    const response = await axiosInstance.get<Blob>(`/organ/excel/user`, {
      responseType: 'blob',
    });

    downloadBlobFile(response.data, `회원 목록.xlsx`);

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
