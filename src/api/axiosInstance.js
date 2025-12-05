import axios from 'axios';
import useAuthStore from '../store/authStore';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else if (config.url.includes('/admin/re-issue')) {
      config.headers['Authorization'] = 'Bearer expired_or_null';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (originalRequest.url.includes('/admin/re-issue')) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { token } = useAuthStore.getState();

        const response = await axios.patch(
          `${import.meta.env.VITE_API_BASE_URL}admin/re-issue`,
          {},
          {
            headers: {
              Authorization: token
                ? `Bearer ${token}`
                : 'Bearer expired_or_null',
            },
            withCredentials: true,
          }
        );

        const authHeader = response.headers['authorization'];
        if (!authHeader) {
          throw new Error('Authorization header is missing');
        }

        const accessToken = authHeader.startsWith('Bearer ')
          ? authHeader.slice(7)
          : authHeader;

        useAuthStore.getState().setAuth(accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        window.location.href = '/admin/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
