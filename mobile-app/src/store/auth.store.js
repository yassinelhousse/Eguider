import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { api } from "../api/client";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  // rload token when app starts
  loadAuth: async () => {
    const token = await SecureStore.getItemAsync("token");
    const user = await SecureStore.getItemAsync("user");

    if (token && user) {
      set({ token, user: JSON.parse(user) });
    }
  },

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });

      const res = await api.post("/auth/login", { email, password });

      // save to secure storage
      await SecureStore.setItemAsync("token", res.data.token);
      await SecureStore.setItemAsync("user", JSON.stringify(res.data.user));

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

  register: async (name, email, password) => {
    try {
      set({ loading: true, error: null });

      const res = await api.post("/auth/register", { name, email, password });

      // ✅ save token + user
      await SecureStore.setItemAsync("token", res.data.token);
      await SecureStore.setItemAsync("user", JSON.stringify(res.data.user));

      set({
        user: res.data.user,
        token: res.data.token,
        loading: false,
      });

      return true;
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message || "Register failed",
      });
      return false;
    }
  },

  logout: async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("user");

    set({ user: null, token: null });
  },
}));
