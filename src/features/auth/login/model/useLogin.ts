import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  enterPassword,
  useAuthStore,
  type OrganLoginResponse,
} from '@entities/auth';

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth); // 토큰 저장 함수 가져오기

  return useMutation<
    OrganLoginResponse,
    AxiosError<{ message?: string }>, // 로그인 요청 성공 시 반환되는 데이터 타입
    { organName: string; password: string } // 로그인 요청에 필요한 데이터 타입
  >({
    mutationFn: ({ organName, password }) =>  // 로그인 요청 함수
      enterPassword({ // 로그인 요청에 필요한 데이터 전달
        organName,
        password,
        client: 'ADMIN_VIEW', // 로그인 요청 화면 구분 (관리자 페이지)
      }), 

    onSuccess: ({ accessToken, refreshToken }) => { // 로그인 성공 시 토큰 저장
      if (accessToken && refreshToken) { // accessToken과 refreshToken이 존재하면 상태 업데이트
        setAuth(accessToken, refreshToken);
      }
    },
  });
};
