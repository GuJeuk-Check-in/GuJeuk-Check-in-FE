import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('/react-router') ||
            id.includes('/scheduler/')
          ) {
            return 'vendor-react';
          }

          if (id.includes('/@emotion/')) return 'vendor-emotion';
          if (id.includes('/@tanstack/')) return 'vendor-query';
          if (id.includes('/axios/')) return 'vendor-axios';
          if (id.includes('/mixpanel-browser/')) return 'vendor-mixpanel';
          if (id.includes('/react-calendar/')) return 'vendor-calendar';
          if (id.includes('/@dnd-kit/')) return 'vendor-dnd';
          if (id.includes('/react-icons/')) return 'vendor-icons';

          return 'vendor';
        },
      },
    },
  },
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'src/app'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@entities': path.resolve(__dirname, 'src/entities'),
      '@shared': path.resolve(__dirname, 'src/shared'),
    },
  },
});
