import { create } from "zustand";
import { api } from "../api/client";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });

      const res = await api.post("/auth/login", { email, password });

      set({
        user: res.data.user,
        token: res.data.token,
        loading: false,
      });

      return true;
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message || "Login failed",
      });
      return false;
    }
  },

  logout: () => set({ user: null, token: null }),
}));
