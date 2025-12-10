import axios from 'axios';
import useAuthStore from '../store/authStore';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) =>
    error ? prom.reject(error) : prom.resolve(token)
  );
  failedQueue = [];
};

axiosInstance.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config: originalRequest, response } = error;

    if (!response) {
      return Promise.reject(
        new Error('인터넷 연결이 원활하지 않거나 서버 점검 중입니다.')
      );
    }

    const status = response.status;
    const errorMsg =
      response.data?.message || error.message || '알 수 없는 오류';

    if (
      status === 401 &&
      errorMsg.includes('만료된 토큰') &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { token } = useAuthStore.getState();
        const res = await axios.patch(
          `${import.meta.env.VITE_API_BASE_URL}admin/re-issue`,
          {},
          {
            withCredentials: true,
            headers: { Authorization: token || '' },
          }
        );

        const authHeader =
          res.headers.authorization || res.headers.Authorization;
        const newAccessToken = authHeader?.replace('Bearer ', '');

        if (!newAccessToken) throw new Error('갱신 실패');

        useAuthStore.getState().setAuth(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        useAuthStore.getState().logout();
        window.location.href = '/admin/login?error=expired';
        return Promise.reject(
          new Error('로그인 정보가 만료되었습니다. 다시 로그인해 주세요.')
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
