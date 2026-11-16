import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { tokenStorage } from '@entities/auth';
import { setAccessTokenProvider, setUnauthorizedHandler } from '@shared/api';
import App from './App';
import './styles/global.css';

setAccessTokenProvider(tokenStorage.getAccessToken);

setUnauthorizedHandler(() => {
  tokenStorage.clear();
  if (window.location.pathname !== '/organ/login') {
    window.location.replace('/organ/login');
  }
});

const queryClient = new QueryClient();
const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

const router = createBrowserRouter([{ path: '*', element: <App /> }]);

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
