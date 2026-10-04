import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8000/api";

export const SERVER_BASE_URL =
  API_BASE_URL.replace(/\/api\/?$/, "");

const api = axios.create({
  baseURL: API_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 10000,
});


api.interceptors.request.use(
  (config) => {

    console.log(
      `[API] ${config.method?.toUpperCase()} ${config.url}`
    );

    return config;
  },

  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,

  (error) => {

    console.error(
      "[API ERROR]",
      error.response?.data || error.message
    );

    return Promise.reject(error);
  }
);

export default api;