
import axios from "axios";


const BASE_URL = "http://192.168.1.30:3000/api";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});
