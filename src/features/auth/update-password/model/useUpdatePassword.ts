import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  UpdatePasswordResponse,
  UpdatePasswordRequest,
  updatePassword,
} from '@entities/auth';
export const useUpdatePassword = () => { // 비밀번호 변경 요청을 위한 커스텀 훅
  return useMutation<
    UpdatePasswordResponse, // 비밀번호 변경 요청 성공 시 반환되는 데이터 타입
    AxiosError<{ message?: string }>, // 비밀번호 변경 요청 실패 시 반환되는 오류 타입
    UpdatePasswordRequest // 비밀번호 변경 요청에 필요한 데이터 타입
  >({
    mutationFn: updatePassword, // 비밀번호 변경 요청 함수
  });
};
