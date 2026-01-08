import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import useAuthStore from '../../store/authStore';

interface FailedQueueItem {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface ServerErrorResponse {
  message?: string;
}

interface CustomError extends Error {
  status?: number;
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    error ? reject(error) : resolve(token);
  });
  failedQueue = [];
};

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

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<ServerErrorResponse>) => {
    const response = error.response;
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (!response) {
      return Promise.reject(
        new Error('인터넷 연결이 원활하지 않거나 서버 점검 중입니다.')
      );
    }

    if (
      originalRequest.url?.includes('re-issue') ||
      originalRequest.url?.includes('admin/re-issue')
    ) {
      useAuthStore.getState().logout();
      localStorage.removeItem('auth-storage');
      window.location.href = '/admin/login?error=expired';
      return Promise.reject(
        new Error('세션이 만료되었습니다. 다시 로그인해주세요.')
      );
    }

    const status = response.status;
    let errorMsg = response.data?.message || error.message || '알 수 없는 오류';

    if (
      status === 401 &&
      response.data instanceof Blob &&
      response.data.type.includes('application/json')
    ) {
      try {
        const text = await response.data.text();
        const errorJson = JSON.parse(text);
        errorMsg = errorJson.message || errorMsg;
      } catch {}
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
        }>('admin/re-issue');

        const { accessToken, refreshToken } = res.data;
        useAuthStore.getState().setAuth(accessToken, refreshToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        processQueue(null, accessToken);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        useAuthStore.getState().logout();
        window.location.href = '/admin/login?error=expired';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/admin/login?error=expired';
      return Promise.reject(new Error('다시 로그인을 진행해주세요.'));
    }

    const customError: CustomError = new Error(errorMsg);
    customError.status = status;

    return Promise.reject(customError);
  }
);

export default axiosInstance;
