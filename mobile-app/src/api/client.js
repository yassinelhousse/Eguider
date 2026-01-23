

import axios from "axios";
import { useAuthStore } from "../store/auth.store";

const BASE_URL = "http://192.168.1.6:3000/api"; 

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});













