// Application configuration
export const config = {
  // API Base URL - Update this to match your backend server
  API_BASE_URL: process.env.VITE_API_BASE_URL || "http://localhost:3000/api",

  // Authentication
  TOKEN_STORAGE_KEY: "attara_carni_auth_token",

  // App settings
  APP_NAME: "Attara Carni Admin Dashboard",
  VERSION: "1.0.0",

  // Pagination defaults
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,

  // File upload limits (in bytes)
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],

  // Dashboard refresh intervals (in milliseconds)
  DASHBOARD_REFRESH_INTERVAL: 30000, // 30 seconds
  TRANSACTION_REFRESH_INTERVAL: 10000, // 10 seconds
};

// Environment-specific configurations
export const isDevelopment = process.env.NODE_ENV === "development";
export const isProduction = process.env.NODE_ENV === "production";

// API endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    PROFILE: "/auth/profile",
  },

  // Dashboard
  DASHBOARD: {
    OVERVIEW: "/dashboard/overview",
    RECENT_TRANSACTIONS: "/dashboard/recent-transactions",
    REVENUE_CHART: "/dashboard/revenue-chart",
  },

  // Users
  USERS: {
    LIST: "/users",
    CREATE: "/users",
    GET: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    EXPORT: "/users/export",
  },

  // Stores
  STORES: {
    LIST: "/stores",
    CREATE: "/stores",
    GET: (id: string) => `/stores/${id}`,
    UPDATE: (id: string) => `/stores/${id}`,
    DELETE: (id: string) => `/stores/${id}`,
    EXPORT: "/stores/export",
  },

  // Clients
  CLIENTS: {
    LIST: "/clients",
    CREATE: "/clients",
    GET: (id: string) => `/clients/${id}`,
    UPDATE: (id: string) => `/clients/${id}`,
    DELETE: (id: string) => `/clients/${id}`,
    EXPORT: "/clients/export",
  },

  // Kridi
  KRIDI: {
    LIST: "/kridi",
    CREATE: "/kridi",
    GET: (id: string) => `/kridi/${id}`,
    UPDATE: (id: string) => `/kridi/${id}`,
    DELETE: (id: string) => `/kridi/${id}`,
    EXPORT: "/kridi/export",
  },
};
