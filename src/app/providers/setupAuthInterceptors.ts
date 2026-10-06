import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@entities/auth';
import { axiosInstance } from '@shared/api';

// 토큰 갱신을 기다리는 요청 정보
interface FailedQueueItem {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}

// 재요청 여부를 결정하는 Axios 설정
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 서버 에러 응답 형식
interface ServerErrorResponse {
  message?: string;
}

// 상태 코드 & 커스텀 에러 형식
interface CustomError extends Error {
  status?: number;
}

// Axios 인터셉터 중복 설치 방지
type AxiosInstanceWithSetup = typeof axiosInstance & {
  __authInterceptorsInstalled?: boolean;
};

// 토큰 갱신 진행 여부
let isRefreshing = false;
// 실패했던 토큰 갱신을 기다리는 요청 목록
let failedQueue: FailedQueueItem[] = [];

// 토큰 갱신 완료 후 대기 중인 요청 처리
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
      return;
    }
    resolve(token);
  });
  failedQueue = [];
};

// 로그인 페이지로 이동
const redirectToLogin = () => {
  useAuthStore.getState().logout();
  window.location.href = '/organ/login?error=expired';
};


// 인증 인터셉터 설정
export const setupAuthInterceptors = () => {
  const axiosWithSetup = axiosInstance as AxiosInstanceWithSetup;

  //이미 인증 인터셉터가 있으면 설정 x
  if (axiosWithSetup.__authInterceptorsInstalled) {
    return;
  }
  axiosWithSetup.__authInterceptorsInstalled = true;

  // 요청마다 access token을 헤더에 추가
  axiosInstance.interceptors.request.use( 
    (config: InternalAxiosRequestConfig) => {
      const { accessToken } = useAuthStore.getState();
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // 서버 응답 에러 처리
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError<ServerErrorResponse>) => {
      const response = error.response;
      const originalRequest = error.config as
        | CustomAxiosRequestConfig
        | undefined;

      // 응답 없으면 네크워트/서버 오류
      if (!response || !originalRequest) {
        return Promise.reject(
          new Error('인터넷 연결이 원활하지 않거나 서버 점검 중입니다.')
        );
      }

      // 토큰 재발급 요청을 실패하면 로그인페이지로 이동하고 세션 만료 에러 처리
      if (originalRequest.url?.includes('re-issue')) {
        redirectToLogin();
        return Promise.reject(
          new Error('세션이 만료되었습니다. 다시 로그인해주세요.')
        );
      }

      const status = response.status;
      let errorMsg =

      // 에러에서 전달된 에러 메세지 확인 (없으면 알 수 없는 오류 표시)
        response.data?.message || error.message || '알 수 없는 오류';

      if (
      // Blob 형태의 에러 응답에서 메시지 추출
        status === 401 &&
        response.data instanceof Blob &&
        response.data.type.includes('application/json')
      ) {
        try {
          const text = await response.data.text();
          // 서버에서 전달된 에러 메시지 확인
          const errorJson = JSON.parse(text);
          errorMsg = errorJson.message || errorMsg;
        } catch (parseError) {
          console.error('응답 파싱 실패:', parseError);
          // 실패 시 에러 메세지
        }
      }

      if (
      // 토큰이 만료된 경우 토큰 개발급 후 기존 요청 재시도
        status === 401 &&
        errorMsg.includes('만료된 토큰') &&
        !originalRequest._retry
      ) {
        if (isRefreshing) {
          return new Promise<string | null>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then((newToken) => {
            if (!newToken) {
              return Promise.reject(new Error('Token refresh failed'));
            }
            if (newToken && originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            return axiosInstance(originalRequest);

             // 새 토큰으로 기존 요청 재요청
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const res = await axiosInstance.patch<{
          // 새로운 access 토큰과 refresht 토큰 발급
            accessToken: string;
            refreshToken: string;
          }>('/organ/re-issue');

          const { accessToken, refreshToken } = res.data;
          useAuthStore.getState().setAuth(accessToken, refreshToken);
          
          // 새 토큰 저장

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }

          processQueue(null, accessToken);
          // 대기 중인 요청을 새 토큰으로 처리
          return axiosInstance(originalRequest);

          // 원래 요청 재요청
        } catch (refreshError) {
          processQueue(refreshError, null);
          redirectToLogin();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      if (status === 401 || status === 403) {
      // 인증관련 오류 발생 시 로그인 페이지로 이동
        redirectToLogin();
        return Promise.reject(new Error('다시 로그인을 진행해주세요.'));
      }

      const customError: CustomError = new Error(errorMsg);
      // 그 외 커스텀에러 처리
      customError.status = status;

      return Promise.reject(customError);
    }
  );
};
