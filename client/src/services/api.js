import axios from "axios";
import toast from "react-hot-toast";

// Determine API URL based on environment
const getApiUrl = () => {
  // Production (Vercel)
  if (import.meta.env.PROD) {
    return "/api"; // Vercel will proxy to serverless function
  }
  // Development
  return import.meta.env.VITE_API_URL || "http://localhost:5000/api";
};

const API_URL = getApiUrl();

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // For FormData, remove Content-Type so browser sets it with boundary
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error
      const message = error.response.data.message || "An error occurred";
      toast.error(message);

      // Handle unauthorized (401)
      if (error.response.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
      }
    } else if (error.request) {
      // No response from server
      toast.error("Network error. Please check your connection.");
      console.error("Request error:", error.request);
    } else {
      toast.error("An unexpected error occurred");
    }
    return Promise.reject(error);
  },
);

export default api;
