import { create } from 'zustand';
import Cookies from 'js-cookie';

const useAuthStore = create((set) => ({
  token: Cookies.get('accessToken') || null,
  isAuthenticated: !!Cookies.get('accessToken'),
  user: null,

  setAuth: (accessToken) => {
    Cookies.set('accessToken', accessToken, {
      secure: true,
      sameSite: 'Strict',
    });
    set({
      token: accessToken,
      isAuthenticated: true,
    });
  },

  setUser: (user) => {
    set({ user });
  },

  logout: () => {
    Cookies.remove('accessToken');
    set({
      token: null,
      isAuthenticated: false,
      user: null,
    });
  },
}));

export default useAuthStore;
