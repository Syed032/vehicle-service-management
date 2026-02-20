import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8085/vehicle-service",
});

// Attach JWT automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// AUTO LOGOUT ON TOKEN EXPIRE
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.clear();
      window.location.href = "/";
    }
    

    return Promise.reject(error);
  }
);

export default api;
