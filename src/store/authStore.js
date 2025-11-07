import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,

      setAuth: (token) =>
        set(() => ({
          isAuthenticated: true,
          token: token,
        })),

      logout: () =>
        set(() => ({
          isAuthenticated: false,
          token: null,
        })),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;
