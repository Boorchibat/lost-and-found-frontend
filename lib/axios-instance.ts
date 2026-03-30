import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_ROUTE,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        const decoded: { exp: number } = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return Promise.reject("Token expired");
        }

        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
