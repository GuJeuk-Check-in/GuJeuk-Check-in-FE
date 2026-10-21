import { Router } from './router/Router';
import { ThemeProvider } from '@emotion/react';
import { orangeTheme } from '@center/tokens';

export const App = () => {
  return (
    <ThemeProvider theme={{ admin: orangeTheme }}>
      <Router />
    </ThemeProvider>
  );
};
