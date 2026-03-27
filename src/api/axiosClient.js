// frontend/src/api/axiosClient.js
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL
  ? import.meta.env.VITE_API_BASE_URL
  : import.meta.env.MODE === "development"
    ? "http://127.0.0.1:5000"
    : "https://ai-wrapperz.onrender.com";

const axiosClient = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

// Attach auth token to every request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Global error handling
axiosClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
