import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  token: null,
  isInitializing: true,

  setAuth: (token) =>
    set(() => ({
      isAuthenticated: true,
      token: token,
      isInitializing: false,
    })),

  logout: () =>
    set(() => ({
      isAuthenticated: false,
      token: null,
      isInitializing: false,
    })),
  finishInitialization: () => set({ isInitializing: false }),
}));

export default useAuthStore;
