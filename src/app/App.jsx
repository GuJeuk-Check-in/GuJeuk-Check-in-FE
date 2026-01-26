import { Global, css } from '@emotion/react';
import { Router } from '@app/router';
import { useTokenRefresher } from '@features/auth/index';
import { EffectProvider, TrashEffectProvider } from '@shared/effects';

const App = () => {
  useTokenRefresher();
  return (
    <EffectProvider>
      <TrashEffectProvider>
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
      </TrashEffectProvider>
    </EffectProvider>
  );
};

export default App;
