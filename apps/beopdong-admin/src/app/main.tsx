import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { tokenStorage } from '@entities/auth';
import { axiosInstance, setUnauthorizedHandler } from '@shared/api';
import App from './App';
import './styles/global.css';

axiosInstance.interceptors.request.use((config) => {
  const accessToken = tokenStorage.getAccessToken();
  const isLoginRequest = config.url === '/organ' && config.method === 'post';
  if (accessToken && !isLoginRequest) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

setUnauthorizedHandler(() => {
  tokenStorage.clear();
  if (window.location.pathname !== '/organ/login') {
    window.location.replace('/organ/login');
  }
});

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

const queryClient = new QueryClient();

const router = createBrowserRouter([{ path: '*', element: <App /> }]);

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
