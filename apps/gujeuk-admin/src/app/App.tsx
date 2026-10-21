import { Global, ThemeProvider, css } from '@emotion/react';
import { blueTheme } from '@center/tokens';
import { Router } from '@app/router';
import { useTokenRefresher } from './providers/useTokenRefresher';

const App = () => {
  useTokenRefresher();

  return (
    <ThemeProvider theme={{ admin: blueTheme }}>
      <Global
        styles={css`
          html,
          body {
            margin: 0;
            padding: 0;
            font-family: 'Pretendard', sans-serif;
          }
        `}
      />
      <Router />
    </ThemeProvider>
  );
};

export default App;
