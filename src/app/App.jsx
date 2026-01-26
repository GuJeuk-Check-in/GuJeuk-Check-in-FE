import { Global, css } from '@emotion/react';
import { Router } from '@app/router';
import { useTokenRefresher } from '@features/auth/index';
import { EffectProvider } from '@shared/effects';

const App = () => {
  useTokenRefresher();
  return (
    <EffectProvider>
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
    </EffectProvider>
  );
};

export default App;
