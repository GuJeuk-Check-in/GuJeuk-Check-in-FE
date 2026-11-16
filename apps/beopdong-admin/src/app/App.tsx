import { ThemeProvider } from '@emotion/react';
import { createAdminTheme, orangeTheme } from '@center/tokens';
import { Router } from '@app/router';

const beopdongTheme = createAdminTheme(orangeTheme, { components: { fieldFocus: 'highlight' } });

const App = () => {
  return (
    <ThemeProvider theme={{ admin: beopdongTheme }}>
      <Router />
    </ThemeProvider>
  );
};

export default App;
