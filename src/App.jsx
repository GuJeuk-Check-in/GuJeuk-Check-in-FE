import { useEffect, useState } from 'react';
import { Global, css } from '@emotion/react';
import Router from './Router';
import useAuthStore from './store/authStore';

const App = () => {
  const token = useAuthStore((state) => state.token);

  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    setIsInitializing(false);
  }, [token]);

  if (isInitializing) return null;

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
