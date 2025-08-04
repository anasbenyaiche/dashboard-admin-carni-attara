import api from "./api";
import { userService } from "./userService";
import { storeService } from "./storeService";
import { clientService } from "./clientService";
import { kridiService } from "./kridiService";

export const dashboardService = {
  // Get complete dashboard data
  async getDashboardData() {
    try {
      const [
        usersData,
        storeData,
        clientsData,
        kridiSummary,
        recentTransactions,
      ] = await Promise.allSettled([
        userService.getUsers({ limit: 1 }), // Just to get count
        storeService.getStore(),
        clientService.getClients({ limit: 1 }), // Just to get count
        kridiService.getStoreSummary(),
        kridiService.getRecentEntries(10),
      ]);

      // Process results, handling any failures gracefully
      const dashboard = {
        stats: {
          totalUsers:
            usersData.status === "fulfilled" ? usersData.value?.total || 0 : 0,
          totalStores: 1, // Current store
          totalClients:
            clientsData.status === "fulfilled"
              ? clientsData.value?.total || 0
              : 0,
          attaraMetrics:
            storeData.status === "fulfilled"
              ? storeData.value?.settings?.maxCreditLimit || 0
              : 0,
          kridiMetrics:
            kridiSummary.status === "fulfilled"
              ? kridiSummary.value?.totalDebt || 0
              : 0,
          totalRevenue:
            kridiSummary.status === "fulfilled"
              ? kridiSummary.value?.totalPaid || 0
              : 0,
          monthlyRevenue:
            kridiSummary.status === "fulfilled"
              ? kridiSummary.value?.monthlyPaid || 0
              : 0,
          dailyRevenue:
            kridiSummary.status === "fulfilled"
              ? kridiSummary.value?.dailyPaid || 0
              : 0,
        },
        recentTransactions:
          recentTransactions.status === "fulfilled"
            ? recentTransactions.value || []
            : [],
        store: storeData.status === "fulfilled" ? storeData.value : null,
        kridiSummary:
          kridiSummary.status === "fulfilled" ? kridiSummary.value : null,
      };

      return dashboard;
    } catch (error) {
      throw error;
    }
  },

  // Alias method for backward compatibility
  async getOverview() {
    const data = await this.getDashboardData();
    return data.stats;
  },

  // Get recent transactions
  async getRecentTransactions() {
    try {
      const data = await this.getDashboardData();
      return data.recentTransactions;
    } catch (error) {
      throw error;
    }
  },

  // Get analytics data
  async getAnalyticsData(dateRange = {}) {
    try {
      const { startDate, endDate } = dateRange;

      const params = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const [kridiEntries, kridiSummary] = await Promise.allSettled([
        kridiService.getFilteredEntries(params),
        kridiService.getStoreSummary(),
      ]);

      return {
        entries:
          kridiEntries.status === "fulfilled"
            ? kridiEntries.value
            : { entries: [], total: 0 },
        summary: kridiSummary.status === "fulfilled" ? kridiSummary.value : {},
        dateRange: { startDate, endDate },
      };
    } catch (error) {
      throw error;
    }
  },

  // Get quick stats for cards
  async getQuickStats() {
    try {
      const summary = await kridiService.getStoreSummary();

      return {
        totalDebt: summary.totalDebt || 0,
        totalPaid: summary.totalPaid || 0,
        remainingDebt: summary.remainingDebt || 0,
        totalClients: summary.totalClients || 0,
        activeEntries: summary.activeEntries || 0,
        monthlyGrowth: summary.monthlyGrowth || 0,
      };
    } catch (error) {
      throw error;
    }
  },

  // Search across all entities
  async globalSearch(searchTerm) {
    try {
      const [clients, kridiEntries] = await Promise.allSettled([
        clientService.searchClients(searchTerm, { limit: 5 }),
        kridiService.getFilteredEntries({ search: searchTerm, limit: 5 }),
      ]);

      return {
        clients:
          clients.status === "fulfilled" ? clients.value?.clients || [] : [],
        kridiEntries:
          kridiEntries.status === "fulfilled"
            ? kridiEntries.value?.entries || []
            : [],
      };
    } catch (error) {
      throw error;
    }
  },

  // Get system health status
  async getSystemHealth() {
    try {
      const response = await api.get("/health");
      return {
        status: "healthy",
        timestamp: response.timestamp,
        uptime: "Connected",
      };
    } catch (error) {
      return {
        status: "error",
        timestamp: new Date().toISOString(),
        uptime: "Disconnected",
        error: error.message,
      };
    }
  },
};
