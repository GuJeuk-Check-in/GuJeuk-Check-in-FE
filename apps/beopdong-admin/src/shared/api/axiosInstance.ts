import axios from 'axios';
import { apiBaseUrl } from './apiBaseUrl';

export const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

let unauthorizedHandler: (() => void) | null = null;

export const setUnauthorizedHandler = (handler: (() => void) | null) => {
  unauthorizedHandler = handler;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url === '/organ' && error.config?.method === 'post';

    if (error.response?.status === 401 && !isLoginRequest) {
      unauthorizedHandler?.();
    }

    return Promise.reject(error);
  }
);
