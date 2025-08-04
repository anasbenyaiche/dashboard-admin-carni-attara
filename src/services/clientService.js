import api from "./api";

export const clientService = {
  // Get all clients with pagination and search
  async getClients(params = {}) {
    try {
      return await api.get("/clients", { params });
    } catch (error) {
      throw error;
    }
  },

  // Get single client with balance information
  async getClient(clientId) {
    try {
      return await api.get(`/clients/${clientId}`);
    } catch (error) {
      throw error;
    }
  },

  // Create new client
  async createClient(clientData) {
    try {
      return await api.post("/clients", clientData);
    } catch (error) {
      throw error;
    }
  },

  // Update client
  async updateClient(clientId, clientData) {
    try {
      return await api.put(`/clients/${clientId}`, clientData);
    } catch (error) {
      throw error;
    }
  },

  // Delete client
  async deleteClient(clientId) {
    try {
      return await api.delete(`/clients/${clientId}`);
    } catch (error) {
      throw error;
    }
  },

  // Import clients from Excel file
  async importClientsFromExcel(file) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      return await api.post("/clients/import", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      throw error;
    }
  },

  // Export clients to Excel file
  async exportClientsToExcel() {
    try {
      const response = await api.get("/clients/export", {
        responseType: "blob",
      });

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "clients.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      return { success: true, message: "Export completed successfully" };
    } catch (error) {
      throw error;
    }
  },

  // Search clients
  async searchClients(searchTerm, params = {}) {
    try {
      return await api.get("/clients", {
        params: { ...params, search: searchTerm },
      });
    } catch (error) {
      throw error;
    }
  },
};
