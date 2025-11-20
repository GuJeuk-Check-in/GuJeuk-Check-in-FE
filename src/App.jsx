import { Global, css } from '@emotion/react';
import Router from './Router';
import axios from 'axios';
import { useEffect } from 'react';
import useAuthStore from './store/authStore';

const App = () => {
  const { setAuth, logout, isInitializing, finishInitialization } =
    useAuthStore();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.patch(
          `${import.meta.env.VITE_API_BASE_URL}/admin/re-issue`,
          {},
          { withCredentials: true }
        );

        const { token } = response.data;

        setAuth(token);
      } catch (error) {
        console.log('비로그인 상태 또는 세션 만료');
        logout();
        finishInitialization();
      }
    };

    checkLoginStatus();
  }, [setAuth, logout, finishInitialization]);

  if (isInitializing) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '1.5rem',
        }}
      >
        로그인 확인 중...
      </div>
    );
  }

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
