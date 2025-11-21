import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  token: null,
  refreshToken: null,
  isInitializing: true,

  setAuth: (token, refreshToken) =>
    set(() => ({
      isAuthenticated: true,
      token: token,
      refreshToken: refreshToken,
      isInitializing: false,
    })),

  setToken: (token) =>
    set(() => ({
      token: token,
    })),

  logout: () =>
    set(() => ({
      isAuthenticated: false,
      token: null,
      refreshToken: null,
      isInitializing: false,
    })),

  finishInitialization: () => set({ isInitializing: false }),
}));

export default useAuthStore;
