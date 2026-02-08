import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User) => void;
  setToken: (token: string | null) => void;
  login: (userData: User, token: string) => void;
  logout: () => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  clearError: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),

  setToken: (token) => set({ token, isAuthenticated: !!token }),

  login: (user, token) => set({
    user,
    token,
    isAuthenticated: true,
    error: null
  }),

  logout: () => set({
    user: null,
    token: null,
    isAuthenticated: false,
    error: null
  }),

  setError: (error) => set({ error }),

  setLoading: (isLoading) => set({ isLoading }),

  clearError: () => set({ error: null }),
}));

export default useAuthStore;