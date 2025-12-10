import axios from 'axios';
import useAuthStore from '../store/authStore';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const errorData = error.response?.data;
    const errorMsg = errorData?.message || error.message || '알 수 없는 오류';

    if (!error.response) {
      return Promise.reject(
        new Error(
          '서버와 연결할 수 없습니다. 네트워크 혹은 CORS 설정을 확인하세요.'
        )
      );
    }

    if (
      status === 401 &&
      errorMsg.includes('만료된 토큰') &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
              resolve(axiosInstance(originalRequest));
            },
            reject: (err) => reject(err),
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { token } = useAuthStore.getState();
        const response = await axios.patch(
          `${import.meta.env.VITE_API_BASE_URL}admin/re-issue`,
          {},
          {
            withCredentials: true,
            headers: { Authorization: token ? `${token}` : undefined },
          }
        );

        const authHeader =
          response.headers['authorization'] ||
          response.headers['Authorization'];
        const newAccessToken = authHeader?.startsWith('Bearer ')
          ? authHeader.slice(7)
          : authHeader;

        if (!newAccessToken) throw new Error('새 토큰을 받지 못했습니다.');

        useAuthStore.getState().setAuth(newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        useAuthStore.getState().logout();
        window.location.href = '/admin/login?error=expired';
        return Promise.reject(
          new Error('세션이 만료되어 다시 로그인해야 합니다.')
        );
      } finally {
        isRefreshing = false;
      }
    }

    const customError = new Error(errorMsg);
    customError.status = status;
    return Promise.reject(customError);
  }
);
export default axiosInstance;
