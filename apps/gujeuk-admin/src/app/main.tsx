import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setupAuthInterceptors } from '@app/providers';
import { initializeGoogleAnalytics } from '@shared/lib/googleAnalytics';
import {
  initializeSentryMonitoring,
  SentryErrorBoundary,
} from '@shared/lib/sentryMonitoring';

const queryClient = new QueryClient();
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element was not found.');
}

setupAuthInterceptors();
initializeSentryMonitoring();
initializeGoogleAnalytics();

createRoot(rootElement).render(
  <StrictMode>
    <SentryErrorBoundary
      fallback={({ resetError }) => (
        <div>
          <p>페이지 오류가 발생했습니다.</p>
          <button type="button" onClick={resetError}>
            다시 시도
          </button>
        </div>
      )}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </SentryErrorBoundary>
  </StrictMode>
);
