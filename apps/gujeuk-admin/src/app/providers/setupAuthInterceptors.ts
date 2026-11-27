import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@entities/auth';
import { axiosInstance, publicAxiosInstance } from '@shared/api';

interface FailedQueueItem {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _retryWithoutToken?: boolean;
}

interface ServerErrorResponse {
  message?: string;
}

interface CustomError extends Error {
  status?: number;
}

type AxiosInstanceWithSetup = typeof axiosInstance & {
  __authInterceptorsInstalled?: boolean;
};

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];
let rejectedPublicToken: string | null = null;

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

const redirectToLogin = () => {
  useAuthStore.getState().logout();
  window.location.href = '/organ/login?error=expired';
};

export const setupAuthInterceptors = () => {
  const axiosWithSetup = axiosInstance as AxiosInstanceWithSetup;

  if (axiosWithSetup.__authInterceptorsInstalled) {
    return;
  }
  axiosWithSetup.__authInterceptorsInstalled = true;

  const attachAccessToken = (config: InternalAxiosRequestConfig) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  };

  axiosInstance.interceptors.request.use(attachAccessToken, (error) =>
    Promise.reject(error)
  );

  publicAxiosInstance.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken && accessToken !== rejectedPublicToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  }, (error) => Promise.reject(error));

  publicAxiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<ServerErrorResponse>) => {
      const originalRequest = error.config as
        | CustomAxiosRequestConfig
        | undefined;

      if (
        error.response?.status !== 401 ||
        !originalRequest ||
        originalRequest._retryWithoutToken
      ) {
        return Promise.reject(error);
      }

      originalRequest._retryWithoutToken = true;
      rejectedPublicToken = useAuthStore.getState().accessToken;
      delete originalRequest.headers?.Authorization;

      return publicAxiosInstance(originalRequest);
    }
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError<ServerErrorResponse>) => {
      const response = error.response;
      const originalRequest = error.config as
        | CustomAxiosRequestConfig
        | undefined;

      if (!response || !originalRequest) {
        return Promise.reject(
          new Error('인터넷 연결이 원활하지 않거나 서버 점검 중입니다.')
        );
      }

      if (originalRequest.url?.includes('re-issue')) {
        redirectToLogin();
        return Promise.reject(
          new Error('세션이 만료되었습니다. 다시 로그인해주세요.')
        );
      }

      const status = response.status;
      let errorMsg =
        response.data?.message || error.message || '알 수 없는 오류';

      if (
        status === 401 &&
        response.data instanceof Blob &&
        response.data.type.includes('application/json')
      ) {
        try {
          const text = await response.data.text();
          const errorJson = JSON.parse(text);
          errorMsg = errorJson.message || errorMsg;
        } catch (parseError) {
          console.error('응답 파싱 실패:', parseError);
        }
      }

      if (
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
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const res = await axiosInstance.patch<{
            accessToken: string;
            refreshToken: string;
          }>('/organ/re-issue');

          const { accessToken, refreshToken } = res.data;
          useAuthStore.getState().setAuth(accessToken, refreshToken);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }

          processQueue(null, accessToken);
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          redirectToLogin();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      if (status === 401 || status === 403) {
        redirectToLogin();
        return Promise.reject(new Error('다시 로그인을 진행해주세요.'));
      }

      const customError: CustomError = new Error(errorMsg);
      customError.status = status;

      return Promise.reject(customError);
    }
  );
};
