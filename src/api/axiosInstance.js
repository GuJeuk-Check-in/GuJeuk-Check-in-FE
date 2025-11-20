import axios from 'axios';
import useAuthStore from '../store/authStore';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 전송을 위해 추가
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.patch(
          `${import.meta.env.VITE_API_BASE_URL}admin/re-issue`,
          {},
          { withCredentials: true }
        );

        const { token } = response.data;

        useAuthStore.getState().setToken(token);

        // 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 리프레시도 실패하면 로그아웃
        useAuthStore.getState().logout();
        window.location.href = '/admin/login';
        return Promise.reject(refreshError);
      }
    }

    // 403 에러 (권한 없음)
    if (error.response?.status === 403) {
      console.error('접근 권한이 없습니다:', originalRequest.url);
    }

    // 500 에러 (서버 에러)
    if (error.response?.status >= 500) {
      console.error('서버 에러가 발생했습니다');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
