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

let accessTokenProvider: (() => string | null) | null = null;

export const setAccessTokenProvider = (provider: (() => string | null) | null) => {
  accessTokenProvider = provider;
};

axiosInstance.interceptors.request.use((config) => {
  const token = accessTokenProvider?.();
  if (token) config.headers.set('Authorization', `Bearer ${token}`);
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const isPublicAuthRequest =
      error.config?.url === '/organ' && ['post', 'patch'].includes(error.config?.method);

    if (error.response?.status === 401 && !isPublicAuthRequest) {
      unauthorizedHandler?.();
    }

    return Promise.reject(error);
  }
);
