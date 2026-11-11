const ACCESS_TOKEN_KEY = 'beopdong-access-token';
const REFRESH_TOKEN_KEY = 'beopdong-refresh-token';

const safely = <T>(action: () => T, fallback: T): T => {
  try {
    return action();
  } catch {
    return fallback;
  }
};

export const tokenStorage = {
  save: (accessToken: string, refreshToken: string): boolean => {
    const previousAccessToken = safely(() => localStorage.getItem(ACCESS_TOKEN_KEY), null);

    return safely(() => {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      try {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      } catch (error) {
        safely(() => {
          if (previousAccessToken === null) localStorage.removeItem(ACCESS_TOKEN_KEY);
          else localStorage.setItem(ACCESS_TOKEN_KEY, previousAccessToken);
        }, undefined);
        throw error;
      }
      return true;
    }, false);
  },
  getAccessToken: () => safely(() => localStorage.getItem(ACCESS_TOKEN_KEY), null),
  getRefreshToken: () => safely(() => localStorage.getItem(REFRESH_TOKEN_KEY), null),
  clear: () =>
    safely(() => {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }, undefined),
};
