import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isAuthLoading: false,
  hasCheckedAuth: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
      hasCheckedAuth: true
    }),

  setAuthLoading: (status) =>
    set({ isAuthLoading: status }),

  setCheckedAuth: () =>
    set({ hasCheckedAuth: true }),

  logout: () => {
    localStorage.removeItem("token");
    set({
      user: null,
      isAuthenticated: false,
      isAuthLoading: false,
      hasCheckedAuth: true
    });
  }
}));

export default useAuthStore;
