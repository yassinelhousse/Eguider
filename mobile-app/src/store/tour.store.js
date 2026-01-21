import { create } from "zustand";
import { api } from "../api/client";

export const useTourStore = create((set) => ({
  tours: [],
  loading: false,
  error: null,

  fetchTours: async () => {
    try {
      set({ loading: true, error: null });
      const res = await api.get("/tours");
      set({ tours: res.data, loading: false });
    } catch (err) {
      set({
        loading: false,
        error: err?.message || "Failed to fetch tours",
      });
    }
  },
}));
