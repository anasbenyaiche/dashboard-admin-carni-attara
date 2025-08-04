import api from "./api";

export const userService = {
  // Get all users for the store
  async getUsers(params = {}) {
    try {
      const response = await api.get("/users", { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get single user by ID
  async getUser(userId) {
    try {
      return await api.get(`/users/${userId}`);
    } catch (error) {
      throw error;
    }
  },

  // Create new user
  async createUser(userData) {
    try {
      return await api.post("/users", userData);
    } catch (error) {
      throw error;
    }
  },

  // Update user
  async updateUser(userId, userData) {
    try {
      return await api.put(`/users/${userId}`, userData);
    } catch (error) {
      throw error;
    }
  },

  // Update user role
  async updateUserRole(userId, roleData) {
    try {
      return await api.put(`/users/${userId}/role`, roleData);
    } catch (error) {
      throw error;
    }
  },

  // Delete user
  async deleteUser(userId) {
    try {
      return await api.delete(`/users/${userId}`);
    } catch (error) {
      throw error;
    }
  },

  // Get users by role
  async getUsersByRole(role) {
    try {
      return await api.get(`/users/role/${role}`);
    } catch (error) {
      throw error;
    }
  },
};
