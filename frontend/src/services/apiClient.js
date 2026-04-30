import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  timeout: 15000
});

export const buildAssetUrl = (path = "") => {
  const host = (import.meta.env.VITE_ASSET_BASE_URL || "http://localhost:5000").replace(/\/$/, "");
  if (!path) return "/fallback.jpg";
  if (/^https?:\/\//i.test(path)) return path;
  return `${host}${path.startsWith("/") ? path : `/${path}`}`;
};

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Request failed. Please try again.";
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
