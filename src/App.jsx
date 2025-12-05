import { useEffect, useState } from 'react';
import { Global, css } from '@emotion/react';
import Router from './Router';
import useAuthStore from './store/authStore';
import { axiosInstance } from './api/axiosInstance';

const App = () => {
  const [isInitializing, setIsInitializing] = useState(true);

  const token = useAuthStore((state) => state.token);
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const silentRefresh = async () => {
      if (token) {
        setIsInitializing(false);
        return;
      }

      try {
        const response = await axiosInstance.patch('/admin/re-issue');
        const authHeader = response.headers['authorization'];
        const accessToken =
          authHeader && authHeader.startsWith('Bearer ')
            ? authHeader.slice(7)
            : authHeader;

        if (accessToken) {
          setAuth(accessToken);
          console.log('로그인 유지 성공');
        }
      } catch (error) {
      } finally {
        setIsInitializing(false);
      }
    };

    silentRefresh();
  }, [token, setAuth]);

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
