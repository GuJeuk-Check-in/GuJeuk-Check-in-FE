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

    if (token && typeof token === 'string' && token.length > 0) {
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
            withCredentials: true,
            headers: {
              Authorization: token ? `Bearer ${token}` : 'Bearer a.b.c',
            },
          }
        );

        const authHeader =
          response.headers['authorization'] ||
          response.headers['Authorization'];

        if (!authHeader) {
          throw new Error('Authorization header is missing');
        }

        const accessToken = authHeader.startsWith('Bearer ')
          ? authHeader.slice(7)
          : authHeader;

        useAuthStore.getState().setAuth(accessToken);

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

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
