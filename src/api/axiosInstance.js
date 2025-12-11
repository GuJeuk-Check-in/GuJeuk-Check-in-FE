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
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
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
        const { accessToken } = useAuthStore.getState();

        const res = await axios.patch(
          `${import.meta.env.VITE_API_BASE_URL}admin/re-issue`,
          {},
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Reissue 응답:', res.data); // 디버깅용

        const newAccessToken = res.data?.accessToken;
        const newRefreshToken = res.data?.refreshToken;

        if (!newAccessToken || !newRefreshToken) {
          console.error('서버 응답:', res.data);
          throw new Error('서버 응답에서 인증 정보를 찾을 수 없습니다.');
        }

        useAuthStore.getState().setAuth(newAccessToken, newRefreshToken);

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

    if (status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/admin/login?error=expired';
      return Promise.reject(new Error('다시 로그인을 진행해주세요.'));
    }

    const customError = new Error(errorMsg);
    customError.status = status;
    return Promise.reject(customError);
  }
);

export default axiosInstance;
