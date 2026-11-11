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
    const saved = safely(() => {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      return true;
    }, false);
    if (!saved) {
      safely(() => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
      }, undefined);
    }
    return saved;
  },
  getAccessToken: () => safely(() => localStorage.getItem(ACCESS_TOKEN_KEY), null),
  getRefreshToken: () => safely(() => localStorage.getItem(REFRESH_TOKEN_KEY), null),
  clear: () =>
    safely(() => {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }, undefined),
};
