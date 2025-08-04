import api from "./api";

export const authService = {
  // Login user
  async login(credentials) {
    try {
      const response = await api.post("/auth/login", credentials);

      if (response.token) {
        localStorage.setItem("auth_token", response.token);
        localStorage.setItem("user_data", JSON.stringify(response.user));
      }

      return response;
    } catch (error) {
      throw error;
    }
  },

  // Register new user
  async register(userData) {
    try {
      const response = await api.post("/auth/register", userData);

      if (response.token) {
        localStorage.setItem("auth_token", response.token);
        localStorage.setItem("user_data", JSON.stringify(response.user));
      }

      return response;
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    window.location.href = "/login";
  },

  // Get current user
  getCurrentUser() {
    const userData = localStorage.getItem("user_data");
    return userData ? JSON.parse(userData) : null;
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem("auth_token");
  },

  // Get user profile
  async getProfile() {
    try {
      return await api.get("/auth/profile");
    } catch (error) {
      throw error;
    }
  },
};
