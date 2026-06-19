import { Global, css } from '@emotion/react';
import { Router } from '@app/router';
import { useTokenRefresher } from './providers/useTokenRefresher';
import { useCheckInQueueSync } from './providers/useCheckInQueueSync';

const App = () => {
  useTokenRefresher();
  useCheckInQueueSync();

  return (
    <>
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
    </>
  );
};

export default App;
