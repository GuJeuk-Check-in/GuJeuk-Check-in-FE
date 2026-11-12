import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { tokenStorage } from '@entities/auth';
import { setUnauthorizedHandler } from '@shared/api';
import App from './App';
import './styles/global.css';

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

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
