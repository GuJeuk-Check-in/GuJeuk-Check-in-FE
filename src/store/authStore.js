import { create } from 'zustand';
import Cookies from 'js-cookie';

const useAuthStore = create((set) => ({
  token: Cookies.get('accessToken') || null,
  isAuthenticated: !!Cookies.get('accessToken'),
  user: null,

  setAuth: (token) => {
    Cookies.set('accessToken', token, { secure: true, sameSite: 'Strict' });

    set({
      token: token,
      isAuthenticated: true,
    });
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
