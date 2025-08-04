import api from "./api";

export const kridiService = {
  // Get Kridi entries for a specific client
  async getKridiEntriesByClient(clientId, params = {}) {
    try {
      return await api.get(`/kridi/client/${clientId}`, { params });
    } catch (error) {
      throw error;
    }
  },

  // Create new Kridi entry (debt or payment)
  async createKridiEntry(entryData) {
    try {
      return await api.post("/kridi", entryData);
    } catch (error) {
      throw error;
    }
  },

  // Mark payment for a Kridi entry
  async markPayment(entryId, paymentData) {
    try {
      return await api.put(`/kridi/${entryId}/payment`, paymentData);
    } catch (error) {
      throw error;
    }
  },

  // Get store summary (total debt, payments, etc.)
  async getStoreSummary() {
    try {
      return await api.get("/kridi/summary");
    } catch (error) {
      throw error;
    }
  },

  // Get recent Kridi entries
  async getRecentEntries(limit = 10) {
    try {
      return await api.get("/kridi/recent", {
        params: { limit },
      });
    } catch (error) {
      throw error;
    }
  },

  // Get Kridi entries by store with filters
  async getEntriesByStore(params = {}) {
    try {
      return await api.get("/kridi/store", { params });
    } catch (error) {
      throw error;
    }
  },

  // Update Kridi entry
  async updateEntry(entryId, entryData) {
    try {
      return await api.put(`/kridi/${entryId}`, entryData);
    } catch (error) {
      throw error;
    }
  },

  // Delete Kridi entry
  async deleteEntry(entryId) {
    try {
      return await api.delete(`/kridi/${entryId}`);
    } catch (error) {
      throw error;
    }
  },

  // Get single Kridi entry
  async getEntry(entryId) {
    try {
      return await api.get(`/kridi/${entryId}`);
    } catch (error) {
      throw error;
    }
  },

  // Get Kridi entries with advanced filtering
  async getFilteredEntries(filters = {}) {
    try {
      const params = {
        ...filters,
        page: filters.page || 1,
        limit: filters.limit || 20,
      };

      return await api.get("/kridi/store", { params });
    } catch (error) {
      throw error;
    }
  },

  // Get Kridi statistics for dashboard
  async getKridiStats() {
    try {
      const summary = await this.getStoreSummary();
      const recentEntries = await this.getRecentEntries(5);

      return {
        summary,
        recentEntries,
      };
    } catch (error) {
      throw error;
    }
  },
};
