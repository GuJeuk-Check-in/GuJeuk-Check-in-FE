import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token: null,
  isAuthenticated: false,
  user: null,

  setAuth: (token) => {
    set({
      token: token,
      isAuthenticated: true,
    });
  },

  logout: () => {
    set({
      token: null,
      isAuthenticated: false,
      user: null,
    });
  },
}));

export default useAuthStore;
