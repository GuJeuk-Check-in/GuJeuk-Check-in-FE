import { ThemeProvider } from '@emotion/react';
import { orangeTheme } from '@center/tokens';
import { Router } from '@app/router';

const App = () => {
  return (
    <ThemeProvider theme={{ admin: orangeTheme }}>
      <Router />
    </ThemeProvider>
  );
};

export default App;
