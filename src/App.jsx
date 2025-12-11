import { Global, css } from '@emotion/react';
import Router from './Router';
import useTokenRefresher from './hooks/useTokenRefresher';
const App = () => {
  useTokenRefresher();
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
