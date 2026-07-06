import { Global, css } from '@emotion/react';
import { Router } from '@app/router';
import { useTokenRefresher } from './providers/useTokenRefresher';
import { useCheckInQueueDrain } from './providers/useCheckInQueueDrain';

const App = () => {
  useTokenRefresher();
  useCheckInQueueDrain();

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
