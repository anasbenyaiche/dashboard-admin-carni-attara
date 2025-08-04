import api from "./api";

export const storeService = {
  // Get current store info
  async getStore() {
    try {
      return await api.get("/stores");
    } catch (error) {
      throw error;
    }
  },

  // Get store by ID
  async getStoreById(storeId) {
    try {
      return await api.get(`/stores/${storeId}`);
    } catch (error) {
      throw error;
    }
  },

  // Create new store
  async createStore(storeData) {
    try {
      return await api.post("/stores", storeData);
    } catch (error) {
      throw error;
    }
  },

  // Update store
  async updateStore(storeData) {
    try {
      return await api.put("/stores", storeData);
    } catch (error) {
      throw error;
    }
  },

  // Delete store
  async deleteStore(storeId) {
    try {
      return await api.delete(`/stores/${storeId}`);
    } catch (error) {
      throw error;
    }
  },

  // Get stores by owner
  async getStoresByOwner() {
    try {
      return await api.get("/stores/owner");
    } catch (error) {
      throw error;
    }
  },

  // Toggle store status
  async toggleStoreStatus(storeId) {
    try {
      return await api.patch(`/stores/${storeId}/toggle`);
    } catch (error) {
      throw error;
    }
  },

  // Get store settings
  async getStoreSettings() {
    try {
      return await api.get("/stores/settings");
    } catch (error) {
      throw error;
    }
  },

  // Update store settings
  async updateStoreSettings(settings) {
    try {
      return await api.put("/stores/settings", settings);
    } catch (error) {
      throw error;
    }
  },

  // Search stores
  async searchStores(searchTerm) {
    try {
      return await api.get("/stores/search", {
        params: { search: searchTerm },
      });
    } catch (error) {
      throw error;
    }
  },

  // Get active stores
  async getActiveStores() {
    try {
      return await api.get("/stores/active");
    } catch (error) {
      throw error;
    }
  },
};
