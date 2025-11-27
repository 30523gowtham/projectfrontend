import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:30083/back1", // ✅ This matches Nginx proxy path
});

// ✅ Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Optional: Redirect to login on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.clear();
      window.location.href = "/patient/login";
    }
    return Promise.reject(error);
  }
);

export default api;
